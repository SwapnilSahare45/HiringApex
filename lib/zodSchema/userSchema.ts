import z from "zod/v3";

export const registerSchema = z
  .object({
    role: z.enum(["SEEKER", "RECRUITER"], {
      required_error: "You must select a role.",
    }),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const editSeekerProfileSchema = z.object({
  avatar: z
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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  headline: z.string().optional(),
  mobileNo: z
    .string()
    .regex(/^[0-9]{10}$/, {
      message: "Mobile number must be exactly 10 digits.",
    })
    .optional(),
  city: z.string().optional(),
});

export type editSeekerProfileSchemaType = z.infer<
  typeof editSeekerProfileSchema
>;

export const experienceSchema = z
  .object({
    title: z.string().min(1, {
      message: "Job title cannot be empty.",
    }),
    company: z.string().min(1, {
      message: "Company name cannot be empty",
    }),
    location: z.string().optional(),
    isCurrent: z.boolean().default(false).optional(),
    joiningDate: z.coerce.date({
      required_error: "Joining date is required.",
    }),
    leavingDate: z.coerce.date().optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isCurrent) return true;
      if (!data.leavingDate) return true;

      return data.leavingDate > data.joiningDate;
    },
    {
      message: "Leaving date must be after joining date",
      path: ["leavingDate"],
    }
  );

export type experienceSchemaType = z.infer<typeof experienceSchema>;

export const projectSchema = z
  .object({
    title: z.string().min(1, {
      message: "Job title cannot be empty.",
    }),
    startDate: z.coerce.date({
      required_error: "Project start date is required",
    }),
    endDate: z.coerce.date({
      required_error: "Project end date is required",
    }),
    description: z.string().min(1, {
      message: "Please enter description",
    }),
    liveUrl: z
      .string()
      .trim()
      .url({ message: "Must be a valid URL " })
      .optional(),
    githubUrl: z
      .string()
      .trim()
      .url({ message: "Must be a valid github URL" })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return false;

      return data.endDate > data.startDate;
    },
    {
      message: "End date must be after the start date",
      path: ["endDate"],
    }
  );

export type projectSchemaType = z.infer<typeof projectSchema>;

export const educationSchema = z
  .object({
    institution: z.string().min(1, {
      message: "Institution name is required.",
    }),
    degree: z.string().min(1, {
      message: "Degree name is required.",
    }),
    startDate: z.coerce.date({
      required_error: "Start date is required",
    }),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().default(false).optional(),
    grade: z.string().trim().optional(),
    description: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      if (data.isCurrent) return true;
      if (!data.endDate) {
        return false;
      }
      return data.endDate > data.startDate;
    },
    {
      message:
        "End date must be after the start date, or mark as 'currently enrolled'.",
      path: ["endDate"],
    }
  );

export type EducationSchemaType = z.infer<typeof educationSchema>;
