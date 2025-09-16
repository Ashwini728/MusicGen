from dotenv import load_dotenv
import os
from pinecone import Pinecone

# Load API keys
load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not PINECONE_API_KEY:
    raise ValueError("Missing Pinecone API key in .env")

# Connect to Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

# List all indexes
print("Available indexes:", pc.list_indexes())


index_name = "music"  
index = pc.Index(index_name)

print(f"Connected to index: {index_name}")
print("Index stats:", index.describe_index_stats())
