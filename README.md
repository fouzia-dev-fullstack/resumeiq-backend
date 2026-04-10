# ResumeIQ - Backend

AI-Powered ATS Resume Analyzer API built with Node.js and Express.

## Tech Stack
- Node.js
- Express
- MongoDB
- Gemini AI API
- Multer (PDF Upload)

## Features
- Accepts resume text or PDF upload
- Analyzes resume against job description
- Returns ATS match score
- Identifies missing keywords
- Provides improvement suggestions

## API Endpoints
- POST /api/analyze - Analyze resume against job description

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` file with:
   - PORT=5000
   - MONGODB_URI=your_mongodb_uri
   - GEMINI_API_KEY=your_gemini_key
4. Run `node server.js`