# AI-Powered ATS Resume Analyzer

This project is a microservice-based platform developed to analyze the semantic similarity between a resume (CV) and a given job description. The system consists of a main API built with Nest.js and an AI service built with Python (FastAPI). Asynchronous tasks are managed efficiently using a Redis-based job queue (BullMQ).

---

## Key Features

- **Semantic Resume Analysis:** Generates a CV-to-job-description match score by analyzing the meaning of the text, rather than just keyword matching.
- **Asynchronous Job Processing:** Heavy analysis tasks are processed in the background using a Redis-based queue to ensure a non-blocking, responsive user experience.
- **Microservice Architecture:** Two distinct services, each specialized for its role, allowing for independent development, deployment, and scaling.
- **Containerized Dependencies:** Critical infrastructure, such as Redis, is managed with Docker for consistency and ease of setup.

---

## Tech Stack

* **API Gateway & Orchestrator:**
    * [**Nest.js**](https://nestjs.com/) - TypeScript
    * [**Node.js**](https://nodejs.org/en/)
    * [**BullMQ**](https://bullmq.io/) - For managing asynchronous job queues
* **AI Service:**
    * [**Python**](https://www.python.org/)
    * [**FastAPI**](https://fastapi.tiangolo.com/) - For creating high-performance APIs
    * [**Sentence-Transformers**](https://www.sbert.net/) - For encoding text into semantic vectors
    * [**PyTorch**](https://pytorch.org/)
* **Database / Cache / Messaging:**
    * [**Redis**](https://redis.io/)
* **DevOps:**
    * [**Docker**](https://www.docker.com/)

---
### Prerequisites

* [Node.js](https://nodejs.org/en/download/) (v18+ recommended)
* [Python](https://www.python.org/downloads/) (v3.9+ recommended)
* [Docker](https://www.docker.com/products/docker-desktop/) (must be installed and running)

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/halitozken/ats-resume-analyzer.git](https://github.com/halitozken/ats-resume-analyzer.git)
    cd ats-resume-analyzer
    ```

2.  **Set up the AI Service (Python):**
    ```bash
    cd python-nlp-service
    python -m venv .venv
    # On Linux/macOS:
    source .venv/bin/activate
    # On Windows PowerShell:
    .\.venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    ```

3.  **Set up the Backend (Nest.js):**
    ```bash
    cd ../your-nestjs-folder-name 
    npm install
    ```

### Running the Application

Start the following three services in **three separate terminals** in the specified order:

1.  **Start Redis (Docker):**
    ```bash
    docker run -d --name my-redis -p 6379:6379 redis
    # If the container already exists, start it with: docker start my-redis
    ```

2.  **Start the AI Service (Python):**
    ```bash
    # In the python-nlp-service directory, with the virtual environment activated
    uvicorn main:app --reload --port 8001
    ```

3.  **Start the Main API (Nest.js):**
    ```bash
    # In your Nest.js project directory
    npm run start:dev
    ```
---

## API Usage & Testing

You can use an API client like Postman to test the system.

- **Endpoint:** `POST http://localhost:3000/analysis/upload`
- **Body Type:** `form-data`
- **Fields:**
    - `resume` (Type: File): Select a `.pdf` or `.docx` resume file for analysis.
    - `jobDescription` (Type: Text): Paste the job description text to compare against.

**Successful Response (Immediate):**
The API will respond instantly to confirm the job has been queued.
```json
{
    "message": "Analysis has been started.",
    "jobId": "1"
}
```
**Final Result:** The final analysis score will be printed to the console of your running Nest.js service.

---

## License

This project is licensed under the MIT License by Halit Özken.
