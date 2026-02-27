"""from fastapi import FastAPI
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
    return {"status": "Backend Running"}"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import models, federation, report

# ✅ FIRST create app
app = FastAPI(title="Benchmark Health")

# ✅ THEN add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ THEN include routers
app.include_router(models.router, prefix="/models")
app.include_router(federation.router, prefix="/federation")
app.include_router(report.router, prefix="/federation")

@app.get("/")
def home():
    return {"status": "Backend Running"}
