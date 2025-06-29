# config.py
import torch
UPLOAD_DIR = "backend/static/uploads"
OUTPUT_DIR = "backend/static/outputs"
FRAME_RATE = 15
SCORE_THRESHOLD = 0.4
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
