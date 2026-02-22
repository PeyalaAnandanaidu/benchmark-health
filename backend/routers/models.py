from fastapi import APIRouter
from schemas.model_schema import ModelSchema
from config.db import models_collection

router = APIRouter()

@router.post("/upload")
def upload_model(model: ModelSchema):

    data = model.model_dump()

    # insert and capture inserted id
    result = models_collection.insert_one(data)

    # ✅ convert ObjectId to string
    data["_id"] = str(result.inserted_id)

    return {
        "message": "Model registered successfully",
        "model": data
    }