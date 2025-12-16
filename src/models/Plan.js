import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  for: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);

export default Plan;
