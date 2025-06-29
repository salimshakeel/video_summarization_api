import cv2
import torch
from backend.config import SCORE_THRESHOLD

def get_scores(model, features):
    with torch.no_grad():
        features_tensor = torch.tensor(features, dtype=torch.float32).to(model.device)
        scores, _ = model(features_tensor)
    return scores.squeeze().cpu().numpy()

def get_selected_indices(scores, picks, threshold=SCORE_THRESHOLD):
    return [picks[i] for i, score in enumerate(scores) if score >= threshold]

def save_summary_video(video_path, selected_indices, output_path, fps=15):
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
    writer = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (w, h))

    for fid in sorted(frames.keys()):
        writer.write(frames[fid])
    writer.release()
