import cv2
import torch
import numpy as np
from PIL import Image
from torchvision import models, transforms
from backend.config import DEVICE, FRAME_RATE

# Load GoogLeNet once
googlenet = models.googlenet(pretrained=True).to(DEVICE).eval()
feature_extractor = torch.nn.Sequential(
    googlenet.conv1,
    googlenet.maxpool1,
    googlenet.conv2,
    googlenet.conv3,
    googlenet.maxpool2,
    googlenet.inception3a,
    googlenet.inception3b,
    googlenet.maxpool3,
    googlenet.inception4a,
    googlenet.inception4b,
    googlenet.inception4c,
    googlenet.inception4d,
    googlenet.inception4e,
    googlenet.maxpool4,
    googlenet.inception5a,
    googlenet.inception5b,
    googlenet.avgpool,
    torch.nn.Flatten()
)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def extract_features(video_path):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    picks, frames = [], []
    count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if int(count % round(fps // FRAME_RATE)) == 0:
            image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            input_tensor = transform(image).unsqueeze(0).to(DEVICE)
            with torch.no_grad():
                feature = feature_extractor(input_tensor).squeeze(0).cpu().numpy()
                frames.append(feature)
                picks.append(count)
        count += 1
    cap.release()
    return np.stack(frames), picks
