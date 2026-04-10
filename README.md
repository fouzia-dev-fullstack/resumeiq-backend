# ResumeIQ - Backend

A REST API that analyzes resumes against job descriptions using AI.

## Live Demo
- Frontend: https://resumeiq-frontend-89cm.vercel.app
- Backend: https://resumeiq-backend-production-95c8.up.railway.app

## Tech Stack
- Node.js
- Express
- MongoDB
- Gemini AI API
- Multer (PDF Upload)
- pdf-parse

## Features
- Accepts resume text or PDF upload
- Analyzes resume against job description
- Returns ATS match score (0-100)
- Identifies missing keywords
- Highlights strong points
- Provides actionable improvement suggestions

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/analyze | Analyze resume against job description |

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` file with:
   - PORT=5000
   - MONGODB_URI=your_mongodb_uri
   - GEMINI_API_KEY=your_gemini_key
4. Run `node server.js`

## Author
Fouzia - [GitHub](https://github.com/fouzia-dev-fullstack)