# 🎵 AI Music Playlist Maker

An intelligent **AI-powered playlist generator** that creates personalized music playlists based on user mood, activity, and listening preferences. This project uses advanced audio embeddings and recommendation algorithms to deliver high-quality and meaningful music suggestions.

---

## Features

### 🔥 Core Features
- **Mood-based playlist generation** – happy, sad, romantic, energetic, chill, etc.
- **Activity-based playlists** – study, workout, travel, sleep, party.
- **Smart recommendation engine** using audio embeddings + similarity search.
- **Playlist refinement** – remove unwanted songs or regenerate sections.
- **User history learning** – system improves over time based on preferences.

---

## Under the Hood (AI)
- Extracts **YAMNet audio embeddings** from tracks.
- Stores embeddings in **Pinecone vector database** for fast retrieval.
- Uses **cosine similarity search** to recommend the closest songs.
- Optional **Random Forest ranking model** to enhance playlist quality.

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React |
| **Backend** | Python (FastAPI) |
| **AI / ML** | YAMNet embeddings, vector similarity model |
| **Database** | Pinecone, MongoDB |
| **Version Control** | Git + GitHub |

---

##  How It Works

1. User selects **mood**, **activity**, or enters a **custom prompt**.  
2. System converts the query into an **embedding vector**.  
3. Vector similarity search retrieves the closest matching songs.  
4. Playlist is generated with metadata (genre, artist, tempo).  
5. User can save, regenerate, or fine-tune the playlist.  

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](screenshots/home.png)

### 🎧 Playlist Generation Page
![Playlist Page](screenshots/playlist.png)

### 🎵 Mood Selector
![Mood Selector](screenshots/mood.png)
