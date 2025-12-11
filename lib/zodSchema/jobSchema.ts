import z from "zod/v3";

export const postJobSchema = z.object({
  title: z.string().trim().min(1),
  industry: z.string().trim().min(1),
  experienceLevel: z.enum(
    [
      "Internship",
      "Entry Level",
      "Mid-Level",
      "Senior",
      "Lead",
      "Manager",
      "Director",
      "Executive",
    ],
    {
      required_error: "You must select a experience level.",
    }
  ),
  employmentType: z.enum(
    ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
    {
      required_error: "You must select a employment type.",
    }
  ),
  positions: z.number({ message: "Position can be number only." }).optional(),
  deadline: z.coerce.date({ message: "Enter the proper date." }).optional(),
  location: z.string().min(1),
  locationType: z.enum(["On-site", "Remote", "Hybrid"]),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  salaryCurrency: z.enum(["INR", "USD", "EUR", "GBP"]).optional(),
  description: z.string().trim().min(100).max(10000),
  responsibilities: z.array(z.string()).min(1),
  requiredQualifications: z.array(z.string()).min(1),
  niceToHave: z.array(z.string()),
  skills: z.array(z.string()),
  companyBenefits: z.array(z.string()),
  applicationEmail: z.union([z.literal(""), z.string().email()]).optional(),
  externalApplicationLink: z
    .union([z.literal(""), z.string().url()])
    .optional(),
});

export type postJobSchemaType = z.infer<typeof postJobSchema>;
