from fastapi import APIRouter
from services.orchestrator import run_federation

router = APIRouter()

@router.post("/run/{model_id}")
def start_federation(model_id: str):
    return run_federation(model_id)