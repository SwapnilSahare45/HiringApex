import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    postedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
      required: true,
    },
    locationType: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      required: true,
    },
    city: {
      type: String,
      required: function () {
        return this.locationType !== "Remote";
      },
    },
    salaryMin: {
      type: Number,
      min: 0,
    },
    salaryMax: {
      type: Number,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      maxlength: 10000,
      index: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Associate", "Senior", "Lead", "Director", "Executive"],
      required: true,
    },
    requiredSkills: {
      type: [String],
      default: [],
      index: true,
    },
    educationRequired: {
      type: String,
      enum: [
        "None",
        "High School",
        "Associate's Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
      ],
      default: "None",
    },
    applicationDeadline: {
      type: Date,
    },
    vacancies: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "Paused", "Draft"],
      default: "Draft",
    },
    views: {
      type: Number,
      default: 0,
    },
    applicants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
