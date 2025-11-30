import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

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
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  skills: {
    type: [String],
    default: [],
  },
  experience: {
    type: [experienceSchema],
    default: [],
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
