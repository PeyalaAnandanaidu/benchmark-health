from sklearn.metrics import accuracy_score
import pandas as pd


# ⭐ Detect protected column automatically
def detect_sensitive_column(df):

    candidates = ["sex", "gender", "race", "age_cat"]

    for col in candidates:
        if col in df.columns:
            return col

    return None


# ⭐ Compute group accuracy safely
def compute_group_accuracy(df, y_true, y_pred, sensitive_col):

    group_results = {}

    # ensure aligned index
    df_local = df.reset_index(drop=True)
    y_true = pd.Series(y_true).reset_index(drop=True)
    y_pred = pd.Series(y_pred).reset_index(drop=True)

    groups = df_local[sensitive_col].dropna().unique()

    for g in groups:

        mask = df_local[sensitive_col] == g

        if mask.sum() == 0:
            continue

        try:
            acc = accuracy_score(y_true[mask], y_pred[mask])
            group_results[str(g)] = float(acc)
        except Exception:
            continue

    return group_results


# ⭐ Calculate fairness gap
def compute_bias_gap(group_results):

    if not group_results or len(group_results) < 2:
        return None

    values = list(group_results.values())

    return float(max(values) - min(values))


# ⭐ FULL FAIRNESS PIPELINE
def run_fairness_analysis(df, y_true, y_pred):

    sensitive_col = detect_sensitive_column(df)

    # No fairness attribute found
    if sensitive_col is None:
        return {
            "fairness_metric": None,
            "bias_gap": None
        }

    group_acc = compute_group_accuracy(
        df,
        y_true,
        y_pred,
        sensitive_col
    )

    bias_gap = compute_bias_gap(group_acc)

    return {
        "fairness_metric": {
            "attribute": sensitive_col,
            "group_accuracy": group_acc
        },
        "bias_gap": bias_gap
    }