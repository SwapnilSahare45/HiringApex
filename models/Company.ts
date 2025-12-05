import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    adminRecruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recruiterIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    websiteUrl: {
      type: String,
      requried: true,
    },
    linkedinUrl: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    industry: {
      type: String,
    },
    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    headquarters: {
      type: String,
    },
    foundedYear: {
      type: Number,
      min: 1600,
      max: new Date().getFullYear(),
    },
    verificationStatus: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Verified", "Rejected"],
    },
    verificationNotes: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);
