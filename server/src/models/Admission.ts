import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: [true, "Candidate name is required"],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  dob: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  image: {
    type: String,
    required: [true, "Candidate image is required"],
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: [true, "College ID is required"]
  }
}, {
  timestamps: true,
});

const Admission = mongoose.model("Admission", AdmissionSchema);

export default Admission;