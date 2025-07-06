from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import summarize
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import os

app = FastAPI()
app.include_router(summarize.router)

# ✅ Root route to avoid 404 on /
@app.get("/")
def read_root():
    return JSONResponse(content={"message": "Video summarization API is running"})

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static folder
static_dir = os.path.join("backend", "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")
