from fastapi import APIRouter
from fastapi.responses import FileResponse

from services.orchestrator import run_federation
from services.report_generator import generate_report

router = APIRouter()


@router.post("/report/{model_id}")
def generate_benchmark_report(model_id: str):

    results = run_federation(model_id)

    pdf_path = generate_report(results, model_id)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=f"{model_id}_report.pdf"
    )