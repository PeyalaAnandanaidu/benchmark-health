from fastapi import FastAPI
from routers import models, federation, report

app = FastAPI(title="Benchmark Health")

# ⭐ Model upload routes
app.include_router(models.router, prefix="/models")

# ⭐ Federation execution routes
app.include_router(federation.router, prefix="/federation")

# ⭐ Report generation routes
app.include_router(report.router, prefix="/federation")

@app.get("/")
def home():
    return {"status": "Backend Running"}