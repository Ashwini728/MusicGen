import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

# Load API key from .env file
load_dotenv()
api_key = os.getenv("PINECONE_API_KEY")

# Initialize Pinecone
pc = Pinecone(api_key=api_key)

# Create index
pc.create_index(
    name="example-index",
    dimension=1536,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)

# Connect to index
index = pc.Index("example-index")

# Insert vectors
index.upsert([
    {"id": "vec1", "values": [0.1, 0.2, 0.3]},
    {"id": "vec2", "values": [0.4, 0.5, 0.6]}
])

# Query index
result = index.query(vector=[0.1, 0.2, 0.3], top_k=2, include_values=True)
print(result)
