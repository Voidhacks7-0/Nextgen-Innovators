const TestSchema = new mongoose.Schema({
  company: String, // e.g., "Google"
  role: String,    // e.g., "SDE"
  difficulty: String,
  questions: [{
    title: String,
    description: String,
    options: [String],
    correctAnswerIndex: Number,
    explanation: String
  }]
});