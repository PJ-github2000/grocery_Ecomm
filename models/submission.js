import mongoose, { models } from 'mongoose';

const SubmissionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Submission = models.Submission || mongoose.modal("Submission", SubmissionSchema)
export default Submission
// export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
