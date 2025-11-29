const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/svvv_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"));

// --- ROUTES ---

// 1. Login Route
app.post('/api/login', async (req, res) => {
  const { enrollmentId, password, role } = req.body;
  // In real app: Use bcrypt to compare hashed passwords
  const user = await User.findOne({ enrollmentId, role });
  
  if (user && user.password === password) {
    // Generate Token (Mock for now)
    res.json({ success: true, token: "mock_jwt_token", user });
  } else {
    res.status(401).json({ success: false, message: "Invalid Credentials" });
  }
});

// 2. Fetch Student Dashboard Data
app.get('/api/student/:id/dashboard', async (req, res) => {
  const student = await User.findById(req.params.id);
  const submissions = await Submission.find({ studentId: req.params.id });
  
  res.json({
    attendance: student.academics.attendance,
    cgpa: student.academics.cgpa,
    placementScore: calculateAvgScore(submissions), // Helper function
    pendingTasks: 3 // Fetch from Assignments
  });
});

// 3. Submit Test & Generate Analysis
app.post('/api/test/submit', async (req, res) => {
  const { studentId, testId, answers } = req.body;
  
  // Calculate Score Logic
  const test = await Test.findById(testId);
  let score = 0;
  test.questions.forEach((q, idx) => {
    if(answers[idx] === q.correctAnswerIndex) score++;
  });

  // Save Submission
  const submission = new Submission({
    studentId, testId, score,
    totalQuestions: test.questions.length,
    aiAnalysis: `Generated analysis based on score ${score}` 
  });
  await submission.save();

  res.json({ success: true, score, total: test.questions.length });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
