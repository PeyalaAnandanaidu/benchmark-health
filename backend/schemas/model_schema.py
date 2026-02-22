from pydantic import BaseModel

class ModelSchema(BaseModel):
    name: str
    type: str