import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
    trim: true,
    required: false,
  },
  githubUrl: {
    type: String,
    trim: true,
    required: false,
  },
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
