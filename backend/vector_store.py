from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

def create_vector_store(documents):
    embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vector_store = FAISS.from_documents(documents, embedding)
    return vector_store

def get_retriever(vector_store, k=4):
    return vector_store.as_retriever(search_type="similarity", search_kwargs={"k": k})
