import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["job_seeker", "recruiter"],
    default: "job_seeker",
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requierd: true,
    unique: true,
  },
  password: {
    type: String,
    requierd: true,
  },
  avatar: {
    type: String,
  },
  headline: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  city: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyWebsite: {
    type: String,
  },
  companySize: {
    type: Number,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
