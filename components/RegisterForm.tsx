"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { TypographyMuted } from "./ui/typography";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const formSchema = z
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
        message: "Password cannot be empty",
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
    message: "Passwords don't match",
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

type RegisterFormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [visible, setVisible] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "job_seeker",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      companyWebsite: "",
      companySize: undefined,
    },
  });

  const hadleTogglePasswordVisibility = () => {
    setVisible(!visible);
  };

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Register data:", data);
  };

  const selectedRole = form.watch("role");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="job_seeker" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Job Seeker
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="recruiter" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Recruiter / Employer
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          aria-label="Username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your full name e.g., (swapnil sahare)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          aria-label="Email Address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedRole === "recruiter" && (
          <>
            <FormField
              control={form.control}
              name="companyName"
              aria-label="Company Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your company name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyWebsite"
              aria-label="Company Website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website (URL)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://www.company.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companySize"
              aria-label="Company Size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 50 "
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="password"
          aria-label="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={visible ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...field}
                    className="pr-10"
                  />
                </FormControl>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={hadleTogglePasswordVisibility}
                >
                  {visible ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          aria-label="Confirm Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4">
          Register
        </Button>
      </form>

      <TypographyMuted className="text-center py-2">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold underline underline-offset-2"
        >
          Login
        </Link>
      </TypographyMuted>
    </Form>
  );
}
