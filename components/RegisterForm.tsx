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
import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { TypographyMuted } from "./ui/typography";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { registerUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerSchema, registerSchemaType } from "@/lib/schema/userSchema";

export default function RegisterForm() {
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  // Server action state
  const [state, formAction, isPending] = useActionState(registerUser, {
    success: false,
    message: "",
    error: "",
    errors: {}
  });

  // Initialize react-hook-form
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema), // Form validation using zod
    // Initial state for all fields
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

  useEffect(() => {

    if (!state.success && state.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          form.setError(field as keyof registerSchemaType, {
            type: 'server',
            message: messages[0]
          })
        }
      })
    }

    if (!state.success && state.error) {
      toast.error(state.error);
    }

    if (state.success) {
      if (state.message) {
        toast.success(state.message);
      }
      router.push("/login");
    }

  }, [state]);

  const togglePassword = () => {
    setVisible(!visible);
  };

  const onSubmit = (data: registerSchemaType) => {
    const formData = new FormData();

    // Append values to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return; // If fields are empty then skip

      // convet number to string
      if (typeof value === "number") {
        formData.append(key, String(value));
        return;
      }

      formData.append(key, value as string); // Append all values to form data
    });

    startTransition(() => {
      formAction(formData);
    });

    // reset the form fields
    form.reset();
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
                  onClick={togglePassword}
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

        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
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
