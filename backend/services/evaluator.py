from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)

from services.model_loader import load_model
import pandas as pd


# ⭐ Normalize labels across datasets
def normalize_labels(y):

    if y.dtype == object:
        y = y.astype(str).str.strip()

        mapping = {
            "<=50K": 0,
            ">50K": 1
        }

        y = y.replace(mapping)

    return y.astype(int)


# ⭐ Compute metrics (binary + multiclass safe)
def evaluate_metrics(y_true, y_pred):

    unique_classes = len(set(y_true))
    avg = "binary" if unique_classes == 2 else "macro"

    results = {
        "accuracy": float(accuracy_score(y_true, y_pred)),
        "precision": float(precision_score(y_true, y_pred, average=avg, zero_division=0)),
        "recall": float(recall_score(y_true, y_pred, average=avg, zero_division=0)),
        "f1_score": float(f1_score(y_true, y_pred, average=avg, zero_division=0)),
    }

    # ROC AUC only valid for binary problems
    if unique_classes == 2:
        try:
            results["roc_auc"] = float(roc_auc_score(y_true, y_pred))
        except:
            results["roc_auc"] = None
    else:
        results["roc_auc"] = None

    return results


# ⭐ FULL REAL MODEL PIPELINE (FEATURE-AWARE)
def run_evaluation(df, model_id):

    if "label" not in df.columns:
        raise ValueError("Dataset missing label column")

    # ⭐ Load model + feature metadata
    model, model_features = load_model(model_id)

    # ⭐ Dataset features
    dataset_features = list(df.drop(columns=["label"]).columns)

    # ⭐ SMART FEATURE MATCHING CHECK
    if set(dataset_features) != set(model_features):
        raise ValueError("Dataset incompatible with model features")

    # Normalize labels
    y_true = normalize_labels(df["label"])

    # Use SAME column order as training
    X = df[model_features]

    # ⭐ REAL prediction from uploaded model
    y_pred = model.predict(X)

    metrics = evaluate_metrics(y_true, y_pred)

    return metrics, y_true, y_pred