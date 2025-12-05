import z from "zod/v3";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const CreateCompanySchema = z.object({
  name: z.string().min(1, {
    message: "Company name cannot be empty",
  }),
  websiteUrl: z.string().url({
    message: "Must be a valid URL",
  }),
  linkedinUrl: z
    .string()
    .url({
      message: "Must be a valid LinkedIn URL",
    })
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(50, {
      message: "Desciption must be at least 50 characters.",
    })
    .optional(),
  headquarters: z.string().optional(),
  foundedYear: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseInt(val)) && val.length === 4), {
      message: "Must be 4-digit year",
    }),
  industry: z.string().min(1, {
    message: "Please select an industry.",
  }),
  size: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"], {
    message: "Please select a company size",
  }),
  companyLogo: z
    .any()
    .optional()
    .refine((file) => {
      if (!file || typeof file === "string") return true;
      return file.size <= MAX_FILE_SIZE;
    }, "Max file size is 5MB")
    .refine((file) => {
      if (!file || typeof file === "string") return true;
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

export type CreateCompanySchemaType = z.infer<typeof CreateCompanySchema>;
