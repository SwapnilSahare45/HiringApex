import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    postedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    industry: {
      type: String,
      trim: true,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: [
        "Internship",
        "Entry Level",
        "Mid-Level",
        "Senior",
        "Lead",
        "Manager",
        "Director",
        "Executive",
      ],
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
      required: true,
    },
    positions: {
      type: Number,
    },
    deadline: {
      type: Date,
    },
    locationType: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      default: "On-site",
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    salaryRange: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlenght: 100,
      maxlength: 10000,
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    requiredQualifications: {
      type: [String],
      required: true,
    },
    niceToHave: {
      type: [String],
    },
    skills: {
      type: [String],
      required: true,
    },
    companyBenefits: {
      type: [String],
    },
    applicationEmail: {
      type: String,
    },
    externalApplicationLink: {
      type: String,
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

jobSchema.index({ createdAt: -1 });

export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
