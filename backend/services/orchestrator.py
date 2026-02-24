from services.dataset_loader import load_datasets
from services.evaluator import run_evaluation
from services.fairness import run_fairness_analysis


def run_federation(model_id: str):

    datasets = load_datasets()
    results = []

    for node, df in datasets.items():

        try:
            # ⭐ Run evaluation (feature-aware)
            metrics, y_true, y_pred = run_evaluation(df, model_id)

            # ⭐ Run fairness analysis
            fairness = run_fairness_analysis(df, y_true, y_pred)

            result = {
                "model_id": model_id,
                "node": node,
                "status": "evaluated",
                **metrics,
                **fairness
            }

        except ValueError as e:
            # ⭐ Expected case → feature mismatch or label issues
            result = {
                "model_id": model_id,
                "node": node,
                "status": "skipped",
                "reason": "feature mismatch"
            }

        except Exception:
            # ⭐ Unexpected crash → keep system safe
            result = {
                "model_id": model_id,
                "node": node,
                "status": "failed"
            }

        results.append(result)

    return results