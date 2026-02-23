import pandas as pd
import os

BASE_PATH = "federation_nodes"

def load_datasets():
    datasets = {}

    for hospital in os.listdir(BASE_PATH):

        hospital_path = os.path.join(BASE_PATH, hospital)

        if os.path.isdir(hospital_path):

            for file in os.listdir(hospital_path):

                if file.endswith(".csv"):
                    file_path = os.path.join(hospital_path, file)

                    df = pd.read_csv(file_path)

                    if "label" not in df.columns:
                        raise ValueError(f"{file} missing label column")

                    datasets[hospital] = df

    return datasets