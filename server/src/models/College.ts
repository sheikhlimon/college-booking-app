import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "College name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "College image is required"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    admissionDate: {
      type: String,
      required: [true, "Admission date is required"],
    },
    events: [
      {
        type: String,
        trim: true,
      },
    ],
    researchCount: {
      type: Number,
      default: 0,
    },
    sports: [
      {
        type: String,
        trim: true,
      },
    ],
    gallery: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const College = mongoose.model("College", CollegeSchema);

export default College;

