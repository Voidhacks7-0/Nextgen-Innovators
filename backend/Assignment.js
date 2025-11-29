const AssignmentSchema = new mongoose.Schema({
  title: String,
  type: String, // 'Remedial', 'Project', 'Homework'
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of Student IDs
  dueDate: Date,
  status: { type: String, default: 'Pending' },
  isAiGenerated: { type: Boolean, default: false }
});