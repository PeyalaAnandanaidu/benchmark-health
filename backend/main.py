from fastapi import FastAPI
from routers import models, federation  

app = FastAPI(title="Benchmark Health")

# include routes
app.include_router(models.router, prefix="/models")
app.include_router(federation.router, prefix="/federation") 

@app.get("/")
def home():
    return {"status": "Backend Running"}