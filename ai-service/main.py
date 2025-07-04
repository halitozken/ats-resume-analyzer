# main.py
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
import uvicorn
import PyPDF2
from docx import Document
import io
from sentence_transformers import SentenceTransformer, util

class AnalysisResult(BaseModel):
    similarity_score: float
    message: str

app = FastAPI(
    title="CV-JD Analysis API",
    description="Analyzes the similarity between a resume and a job description."
)

print("Loading NLP model...")
model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
print("Model loaded successfully.")

def extract_text(file_stream, filename: str) -> str:
    if filename.endswith(".pdf"):
        reader = PyPDF2.PdfReader(file_stream)
        return "".join(page.extract_text() for page in reader.pages)
    elif filename.endswith(".docx"):
        doc = Document(file_stream)
        return "\n".join(para.text for para in doc.paragraphs)
    else:
        return file_stream.read().decode('utf-8')



@app.post("/analyze", response_model=AnalysisResult)
async def analyze_documents(
    resume: UploadFile = File(..., description="Candidate's resume file (PDF, DOCX)"),
    job_description: str = Form(..., description="Full text of the job description")
):

    try:
        resume_text = extract_text(io.BytesIO(await resume.read()), resume.filename)
        
        if not resume_text or not job_description:
            raise HTTPException(status_code=400, detail="Resume or job description text is empty.")

        resume_embedding = model.encode(resume_text, convert_to_tensor=True)
        jd_embedding = model.encode(job_description, convert_to_tensor=True)

        cosine_sim = util.pytorch_cos_sim(resume_embedding, jd_embedding)
        
        score = round(cosine_sim.item() * 100, 2)

        return AnalysisResult(
            similarity_score=score,
            message="Analysis completed successfully."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during analysis: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)