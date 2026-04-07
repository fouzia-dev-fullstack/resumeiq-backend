require('dotenv').config();
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const upload = require('../middleware/upload');
const parseResume = require('../utils/parseResume');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// switch: set to true when you have Gemini API credits
const USE_REAL_AI = false;

router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    let resumeText;

    // If PDF uploaded → extract text from it
    if (req.file) {
      resumeText = await parseResume(req.file.buffer);
    } else if (req.body.resumeText) {
      // If plain text sent → use that
      resumeText = req.body.resumeText;
    } else {
      return res.status(400).json({ error: 'Please upload a PDF or provide resume text!' });
    }

    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: 'Please provide a job description!' });
    }

    let analysis;

    if (USE_REAL_AI) {
      // REAL Gemini AI analysis
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `
        You are an ATS (Applicant Tracking System) expert.
        Analyze this resume against the job description.
        
        Resume: ${resumeText}
        Job Description: ${jobDescription}
        
        Return ONLY a JSON object with:
        {
          "matchScore": (number 0-100),
          "missingKeywords": (array of strings),
          "strongPoints": (array of strings),
          "suggestions": (array of strings)
        }
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const clean = text.replace(/```json|```/g, '').trim();
      analysis = JSON.parse(clean);

    } else {
      //  MOCK response for demo purposes (real AI code above is ready to swap in)
      analysis = {
        matchScore: 78,
        missingKeywords: ["Docker", "AWS", "TypeScript"],
        strongPoints: ["React", "Node.js", "MongoDB", "REST APIs"],
        suggestions: [
          "Add Docker experience to your resume",
          "Mention any cloud platform experience",
          "Include TypeScript in your skills",
          "Quantify your achievements with numbers"
        ]
      };
    }

    res.json({ success: true, analysis });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

module.exports = router;