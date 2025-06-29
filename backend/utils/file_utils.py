import os
from uuid import uuid4

def save_uploaded_file(uploaded_file, upload_dir):
    os.makedirs(upload_dir, exist_ok=True)
    filename = f"{uuid4().hex}_{uploaded_file.filename}"
    filepath = os.path.join(upload_dir, filename)
    with open(filepath, "wb") as f:
        f.write(uploaded_file.file.read())
    return filepath
