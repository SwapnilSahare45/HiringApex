import { LoggedInUser } from "./loggedInUser";

export type JobResponseType = {
  _id: string;
  companyId: {
    _id: string;
    name: string;
    slug: string;
    websiteUrl: string;
    linkedinUrl: string;
    companyLogo: string;
    description: string;
    industry: string;
    size: string;
    headquarters: string;
    foundedYear: number;
    createdAt: Date;
  };
  postedById: LoggedInUser;
  title: string;
  employmentType: string;
  locationType: string;
  city: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  industry: string;
  experienceLevel: string;
  requiredSkills: string[];
  vacancies: number;
  status: string;
  createdAt: Date;
};
