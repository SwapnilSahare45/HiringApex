import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
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
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  leavingDate: {
    type: Date,
    default: null,
  },
  isCurrent: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
});

export const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
