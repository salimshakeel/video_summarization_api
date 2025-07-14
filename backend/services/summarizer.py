import cv2
import torch
from backend.config import SCORE_THRESHOLD

def get_scores(model, features):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    with torch.no_grad():
        features_tensor = torch.tensor(features, dtype=torch.float32).to(device)
        scores, _ = model(features_tensor)
    return scores.squeeze().cpu().numpy()


def get_selected_indices(scores, picks, threshold=SCORE_THRESHOLD):
    return [picks[i] for i, score in enumerate(scores) if score >= threshold]

import subprocess
import os

def save_summary_video(video_path, selected_indices, output_path, fps=15):
    import cv2

    cap = cv2.VideoCapture(video_path)
    selected = set(selected_indices)
    frame_id = 0
    frames = {}

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if frame_id in selected:
            frames[frame_id] = frame
        frame_id += 1
    cap.release()

    if not frames:
        print("No frames selected.")
        return

    h, w, _ = list(frames.values())[0].shape

    # 1️⃣ Save raw video first
    raw_output_path = output_path.replace(".mp4", "_raw.mp4")
    writer = cv2.VideoWriter(raw_output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (w, h))
    for fid in sorted(frames.keys()):
        writer.write(frames[fid])
    writer.release()

    # 2️⃣ Use FFmpeg to fix video (browser-compatible)
    try:
        subprocess.run([
            "ffmpeg",
            "-y",  # overwrite if file exists
            "-i", raw_output_path,
            "-vcodec", "libx264",
            "-acodec", "aac",
            output_path
        ], check=True)
        os.remove(raw_output_path)  # optional: remove raw file
        print(f"✅ FFmpeg re-encoded video saved to: {output_path}")
    except subprocess.CalledProcessError as e:
        print("❌ FFmpeg failed:", e)
        print("⚠️ Using raw video instead.")
        os.rename(raw_output_path, output_path)
 