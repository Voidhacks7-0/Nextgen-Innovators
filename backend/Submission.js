const SubmissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  score: Number,
  totalQuestions: Number,
  aiAnalysis: String, // The generated feedback string
  date: { type: Date, default: Date.now }
});