import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
    unique: true,
  },
  skills: {
    type: [String],
    default: [],
  },
});

export const Skills =
  mongoose.models.Skill || mongoose.model("Skill", skillsSchema);
