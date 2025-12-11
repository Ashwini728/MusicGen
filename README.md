🎵 AI Music Playlist Maker

An intelligent AI-powered playlist generator that creates personalized music playlists based on user mood, activity, and listening preferences. This project uses advanced embeddings and recommendation algorithms to deliver high-quality and meaningful music suggestions.

Features
🔥 Core Features

Mood-based playlist generation – happy, sad, romantic, energetic, chill, etc.

Activity-based playlists – study, workout, travel, sleep, party.

Smart recommendation engine using audio embeddings + similarity search.

Playlist refinement – remove unwanted songs, regenerate specific sections.

User history learning – system improves suggestions over time.

Under the Hood (AI)

Uses audio embeddings extracted from tracks.

Embeddings stored in a vector database for fast retrieval.

Similarity search algorithm recommends the closest matching songs.

Optional overall ranking using a Random Forest / ML model.

Tech Stack

Frontend :	React 
Backend :	Python (FastAPI)
AI / ML	YAMNet embeddings, vector similarity model
Database :	Pinecone,MongoDB
Version Control :	Git + GitHub

How It Works

User selects mood, activity, or custom prompt.

System converts query → embedding vector.

Vector similarity search finds closest matching songs.

Playlists generated with metadata (genre, artist, tempo).

Playlist displayed + options to save, edit, regenerate.
