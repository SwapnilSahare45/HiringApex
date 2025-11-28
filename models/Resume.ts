import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeFile: {
    type: String,
  },
});

export const Resume =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
