from services.dataset_loader import load_datasets

def run_federation(model_id: str):

    datasets = load_datasets()
    results = []

    for node, df in datasets.items():

        result = {
            "model_id": model_id,
            "node": node,
            "records": len(df)
        }

        results.append(result)

    return results