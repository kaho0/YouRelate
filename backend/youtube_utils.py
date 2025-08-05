from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from langchain.text_splitter import RecursiveCharacterTextSplitter

def fetch_transcript_chunks(video_id: str, chunk_size=1000, chunk_overlap=200):
    try:
        transcript_list = YouTubeTranscriptApi().fetch(video_id, languages=["en"])
        transcript = " ".join(chunk.text for chunk in transcript_list)  # FIXED LINE
    except TranscriptsDisabled:
        raise Exception("No captions available for this video.")
    except Exception as e:
        raise Exception(f"Error fetching transcript: {e}")

    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    chunks = splitter.create_documents([transcript])
    return chunks
