from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from youtube_utils import fetch_transcript_chunks
from vector_store import create_vector_store, get_retriever
from llm_utils import generate_answer
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env variables

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize vector store and retriever as globals (for simplicity)
vector_store = None
retriever = None

class QueryRequest(BaseModel):
    video_id: str
    question: str

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.on_event("startup")
async def startup_event():
    global vector_store, retriever
    # Example default video to index on startup or leave empty
    video_id = "-HzgcbRXUK8"
    chunks = fetch_transcript_chunks(video_id)
    vector_store = create_vector_store(chunks)
    retriever = get_retriever(vector_store)

@app.post("/query/")
async def query(request: QueryRequest):
    global retriever
    if retriever is None:
        raise HTTPException(status_code=503, detail="Service not ready")

    # Retrieve docs based on question
    docs = retriever.invoke(request.question)
    context_text = "\n\n".join(doc.page_content for doc in docs)

    # Generate Gemini answer
    answer = generate_answer(context_text, request.question)
    return {"answer": answer}
