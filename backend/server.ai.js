require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------
const PORT = 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAReu2G2o9t3O-ny9-QmyuYCHiZ8prQdlA";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// ---------------------------------------------------------
// AI PROMPT ENGINEERING
// ---------------------------------------------------------
const generatePrompt = (company, role, round, difficulty) => {
    return `
    Act as a senior technical interviewer for ${company}. 
    Generate 5 distinct multiple-choice questions (MCQs) for a "${role}" role.
    
    Context:
    - Round Type: ${round} (e.g., Coding, Aptitude, System Design)
    - Difficulty: ${difficulty}
    - Style: Similar to actual questions asked by ${company} in previous years.

    Output format: STRICT JSON ARRAY. Do not include markdown formatting like \`\`\`json.
    
    Structure per object:
    {
        "id": number,
        "category": "string (e.g., DSA, Quant, Logic)",
        "title": "Short Topic Title",
        "description": "The Question Text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correct": number (0-3 index of correct option),
        "explanation": "Brief explanation of the answer"
    }
    `;
};

// ---------------------------------------------------------
// API ROUTES
// ---------------------------------------------------------

app.post('/api/generate-test', async (req, res) => {
    const { company, role, round, difficulty } = req.body;

    console.log(`Generating ${round} test for ${company}...`);

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: generatePrompt(company, role, round, difficulty) }]
                }]
            })
        });

        const data = await response.json();
        
        // Parsing Gemini Response
        let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        // Clean markdown if present (e.g., ```json ... ```)
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const questions = JSON.parse(rawText);

        res.json({ success: true, questions });

    } catch (error) {
        console.error("AI Generation Error:", error);
        // Fallback to mock data if AI fails
        res.json({ 
            success: true, 
            fallback: true,
            questions: [
                {
                    id: 1, category: "Fallback", title: "Server Error",
                    description: "AI service is currently busy. Here is a sample question: What is 2+2?",
                    options: ["3", "4", "5", "6"], correct: 1, explanation: "Math."
                }
            ]
        });
    }
});

app.listen(PORT, () => {
    console.log(`AI Exam Server running on http://localhost:5000`);
});