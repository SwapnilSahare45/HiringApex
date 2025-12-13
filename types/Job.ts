export type JobResponseType = {
  _id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  industry: string;
  experienceLevel:
    | "Internship"
    | "Entry Level"
    | "Mid-Level"
    | "Senior"
    | "Lead"
    | "Manager"
    | "Director"
    | "Executive";
  employmentType:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Temporary"
    | "Internship";
  positions?: number;
  deadline?: Date;
  locationType: "On-site" | "Remote" | "Hybrid";
  location: string;
  salaryRange?: string;
  description: string;
  responsibilities: string[];
  requiredQualifications: string[];
  niceToHave?: string[];
  skills: string[];
  companyBenefits?: string[];
  applicationEmail?: string;
  externalApplicationLink?: string;
  status: "Active" | "Draft" | "Close";
  appliedStatus:
    | "Applied"
    | "Under Review"
    | "Shortlisted"
    | "Offered"
    | "Rejected";
  views: number;
  applicants: string[];
  createdAt: Date;
};
