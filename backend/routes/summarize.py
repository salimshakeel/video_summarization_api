from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from backend.utils.file_utils import save_uploaded_file
from backend.services.extractor import extract_features
from backend.services.model_loader import load_model
from backend.services.summarizer import get_scores, get_selected_indices, save_summary_video
from backend.config import UPLOAD_DIR, OUTPUT_DIR
import os

router = APIRouter()

@router.post("/summarize")
def summarize_video(video: UploadFile = File(...)):
    if not video.filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
        return JSONResponse(content={"error": "Unsupported file format"}, status_code=400)

    video_path = save_uploaded_file(video, UPLOAD_DIR)
    features, picks = extract_features(video_path)
    model = load_model("backend/Model/epoch-199.pkl")
    scores = get_scores(model, features)
    selected = get_selected_indices(scores, picks)
    output_path = f"{OUTPUT_DIR}/summary_{video.filename}"
    save_summary_video(video_path, selected, output_path)
    summary_url = f"/static/outputs/summary_{video.filename}"

    return JSONResponse(content={
        "message": "Summarization complete",
        "summary_video_url": summary_url
    })

@router.get("/download/{filename}")
def download_file(filename: str):
    file_path = os.path.join("backend", "static", "outputs", filename)
    if os.path.exists(file_path):
        return FileResponse(
            path=file_path,
            filename=filename,
            media_type='application/octet-stream'
        )
    return JSONResponse(content={"error": "File not found"}, status_code=404)
