from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel,EmailStr
from transformers import AutoProcessor, MusicgenForConditionalGeneration
from pymongo import MongoClient
from bson.objectid import ObjectId
from fastapi import HTTPException
from passlib.context import CryptContext
import torch
import scipy.io.wavfile
import io
import os
from datetime import datetime
from dotenv import load_dotenv
from typing import Dict

# Initialize FastAPI
app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


os.makedirs("generated_music", exist_ok=True)

app.mount("/generated_music", StaticFiles(directory="generated_music"), name="generated_music")

print("Loading MusicGen model...")
processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
print("Model loaded successfully!")

class MusicRequest(BaseModel):
    mood: str

@app.post("/generate_music/")
async def generate_music(request: MusicRequest):
    try:
        prompt = request.mood

        # Process input prompt
        inputs = processor(text=[prompt], padding=True, return_tensors="pt")

        audio_values = model.generate(**inputs, max_new_tokens=256)
        audio = audio_values[0, 0].cpu().numpy()
        rate = model.config.audio_encoder.sampling_rate
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base_filename = f"music_{timestamp}"
        audio_filename = os.path.join("generated_music", f"{base_filename}.wav")
        prompt_filename = os.path.join("generated_music", f"{base_filename}.txt")

        scipy.io.wavfile.write(audio_filename, rate, audio)

        with open(prompt_filename, "w", encoding="utf-8") as f:
            f.write(prompt)

        buffer = io.BytesIO()
        scipy.io.wavfile.write(buffer, rate, audio)
        buffer.seek(0)

        return StreamingResponse(
            buffer,
            media_type="audio/wav",
            headers={"Content-Disposition": f"attachment; filename={os.path.basename(audio_filename)}"}
        )

    except Exception as e:
        return {"error": str(e)}

# Endpoint to list all generated music and prompts
@app.get("/list_generated_music/")
def list_generated_music():
    music_files = []
    folder = "generated_music"
    for file in os.listdir(folder):
        if file.endswith(".wav"):
            base_name = os.path.splitext(file)[0]
            prompt_file = os.path.join(folder, f"{base_name}.txt")
            prompt = ""
            if os.path.exists(prompt_file):
                with open(prompt_file, "r", encoding="utf-8") as f:
                    prompt = f.read()
            music_files.append({"filename": file, "prompt": prompt})
    return music_files

# Simple in-memory storage (for demo)
users_db: Dict[str, Dict] = {}

class RegisterModel(BaseModel):
    username: str
    email: str
    password: str

class LoginModel(BaseModel):
    email: str
    password: str

@app.post("/register/")
def register_user(data: RegisterModel):
    if data.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered!")
    users_db[data.email] = {
        "username": data.username,
        "password": data.password
    }
    return {"message": "User registered successfully!"}

@app.post("/login/")
def login_user(data: LoginModel):
    user = users_db.get(data.email)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid email or password!")
    return {"message": "Login successful!"}
    
# Health check route
@app.get("/")
def home():
    return {"message": "Music Generation API is running!"}
