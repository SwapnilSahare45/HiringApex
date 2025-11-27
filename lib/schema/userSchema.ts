import z, { file } from "zod";

export const registerSchema = z
  .object({
    role: z.enum(["job_seeker", "recruiter"] as const, {
      message: "Please select an account type.",
    }),
    username: z
      .string()
      .trim()
      .min(2, {
        message: "Full Name must be at least 2 characters.",
      })
      .max(50, {
        message: "Full Name must be at most 50 characters.",
      }),
    email: z.string().trim().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(1, {
        message: "Password cannot be empty.",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, {
        message:
          "Password must be 8+ characters and contain uppercase, lowercase, number, and symbol.",
      }),
    confirmPassword: z.string(),
    companyName: z.string().optional(),
    companyWebsite: z.string().url().optional().or(z.literal("")),
    companySize: z.number().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.role === "recruiter") {
      if (!data.companyName || data.companyName.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Company Name is required for Recruiter accounts.",
          path: ["companyName"],
        });
      }

      if (!data.companyWebsite || data.companyWebsite.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Company Website is required for Recruiter accounts.",
          path: ["companyWebsite"],
        });
      }

      if (
        data.companySize === undefined ||
        data.companySize === null ||
        typeof data.companySize !== "number" ||
        data.companySize <= 0
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Company Size is required for Recruiter accounts.",
          path: ["companySize"],
        });
      }
    }
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

const fileSchema = z.instanceof(File).or(z.literal(""));
export const editProfileSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .trim()
    .min(2, {
      message: "Full Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Full Name must be at most 50 characters.",
    }),
  headline: z.string().trim().optional(),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits.")
    .max(10, "Mobile number cannot exceed 10 digits.")
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number format. Must be 10 digits."),
  city: z.string().trim().optional(),
  avatar: fileSchema.optional(),
});
