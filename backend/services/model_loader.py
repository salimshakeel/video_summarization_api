import torch
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.layers.summarizer import PGL_SUM
from backend.config import DEVICE

def load_model(weights_path):
    model = PGL_SUM(
        input_size=1024,
        output_size=1024,
        num_segments=4,
        heads=8,
        fusion="add",
        pos_enc="absolute"
    ).to(DEVICE)
    model.load_state_dict(torch.load(weights_path, map_location=DEVICE))
    model.eval()
    return model
