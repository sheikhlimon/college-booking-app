import mongoose from "mongoose";

const ResearchPaperSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "College ID is required"],
    },
    title: {
      type: String,
      required: [true, "Paper title is required"],
      trim: true,
    },
    authors: [
      {
        type: String,
        trim: true,
      },
    ],
    abstract: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      required: [true, "Paper link is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    citations: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const ResearchPaper = mongoose.model("ResearchPaper", ResearchPaperSchema);

export default ResearchPaper;
