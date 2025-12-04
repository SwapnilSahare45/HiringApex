import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  institution: {
    type: String,
    required: true,
    trim: true,
  },

  degree: {
    type: String,
    required: true,
    trim: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    default: null,
  },

  isCurrent: {
    type: Boolean,
    default: false,
  },

  grade: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },
});

export const Education =
  mongoose.models.Education || mongoose.model("Education", educationSchema);
