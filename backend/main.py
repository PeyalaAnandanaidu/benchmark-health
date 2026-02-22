from fastapi import FastAPI
from routers import models

app = FastAPI(title="Benchmark Health")

# include routes
app.include_router(models.router, prefix="/models")

@app.get("/")
def home():
    return {"status": "Backend Running"}