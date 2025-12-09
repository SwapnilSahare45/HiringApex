import z from "zod/v3";

export const postJobSchema = z
  .object({
    title: z.string().trim().nonempty({ message: "Job title is required" }),
    industry: z.string().trim().nonempty({ message: "Industry is required" }),
    employmentType: z.enum(
      ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
      {
        message: "Employment type is required",
      }
    ),
    locationType: z.enum(["On-site", "Remote", "Hybrid"], {
      message: "Location type is required",
    }),
    city: z.string().trim().optional(),
    salaryMin: z.string().optional(),
    salaryMax: z.string().optional(),
    experienceLevel: z.enum(
      ["Fresher", "Associate", "Senior", "Lead", "Director", "Executive"],
      {
        message: "Experience level is required",
      }
    ),
    educationRequired: z.enum(
      [
        "None",
        "High School",
        "Associate's Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
      ],
      {
        message: "Education requirement is required",
      }
    ),
    vacancies: z.string().min(1, { message: "Vacancies must be at least 1" }),
    applicationDeadline: z.date().optional(),
    requiredSkills: z.string().trim().optional(),
    description: z
      .string()
      .max(10000)
      .nonempty({ message: "Job description is required" }),
    requirements: z
      .string()
      .max(10000)
      .nonempty({ message: "Job requirements is required." }),
  })
  .refine(
    (data) => {
      if (data.locationType !== "Remote") {
        return data.city && data.city.trim().length > 0;
      }
      return true;
    },
    {
      message: "City is required for On-site and Hybrid jobs",
    }
  );

export type PostJobSchemaType = z.infer<typeof postJobSchema>;
