import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
  },
  districtName: {
    type: String,
    required: true,
  },
  administratorName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  totalStudents: {
    type: Number,
    required: true,
  },
  currentLunchDebt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;
