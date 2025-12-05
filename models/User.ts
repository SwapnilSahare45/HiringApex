import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["SEEKER", "RECRUITER"],
    default: "SEEKER",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  city: {
    type: String,
  },
  headline: {
    type: String,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
