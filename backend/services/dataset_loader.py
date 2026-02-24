import pandas as pd
import os

BASE_PATH = "federation_nodes"


def load_datasets():

    datasets = {}

    if not os.path.exists(BASE_PATH):
        raise ValueError(f"{BASE_PATH} folder not found")

    # ⭐ loop through hospital folders
    for hospital in os.listdir(BASE_PATH):

        hospital_path = os.path.join(BASE_PATH, hospital)

        if not os.path.isdir(hospital_path):
            continue

        # ⭐ find CSV files
        for file in os.listdir(hospital_path):

            if not file.endswith(".csv"):
                continue

            file_path = os.path.join(hospital_path, file)

            try:
                df = pd.read_csv(file_path)

                # ⭐ ensure label column exists
                if "label" not in df.columns:
                    print(f"⚠ Skipping {file} — no label column")
                    continue

                datasets[hospital] = df

                print(f"✅ Loaded dataset: {hospital} ({file})")

            except Exception as e:
                print(f"❌ Failed loading {file}: {e}")

    return datasets