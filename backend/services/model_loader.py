import joblib
import os

MODEL_DIR = "models_storage"


def load_model(model_id: str):

    model_path = os.path.join(MODEL_DIR, f"{model_id}.pkl")

    if not os.path.exists(model_path):
        raise ValueError(f"Model file not found: {model_id}.pkl")

    data = joblib.load(model_path)

    # ⭐ Support BOTH old and new model formats
    if isinstance(data, dict) and "model" in data and "features" in data:
        return data["model"], data["features"]

    # ⭐ Fallback for old models (no feature metadata)
    raise ValueError("Model missing feature metadata. Re-upload updated model.")