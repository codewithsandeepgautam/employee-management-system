import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']
  },
  position: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  attendance: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  location: {
    type: String,
    default: ''
  },
  joinDate: {
    type: Date,
    required: true
  },
  manager: {
    type: String,
    default: ''
  },
  subjects: [{
    type: String,
    trim: true
  }],
  projectsCompleted: {
    type: Number,
    default: 0,
    min: 0
  },
  currentTasks: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

employeeSchema.index({ department: 1, position: 1 });
employeeSchema.index({ attendance: -1 });
employeeSchema.index({ name: 'text', email: 'text', department: 'text' });

export const Employee = mongoose.model('Employee', employeeSchema);