from fastapi import APIRouter, UploadFile, File
import shutil
import os

router = APIRouter()

MODEL_DIR = "models_storage"

@router.post("/upload")
async def upload_model(file: UploadFile = File(...)):

    file_path = os.path.join(MODEL_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    model_id = file.filename.replace(".pkl", "")

    return {
        "message": "Model uploaded successfully",
        "model_id": model_id
    }