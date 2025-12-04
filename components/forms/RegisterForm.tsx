"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { TypographyP } from "@/components/ui/typography";
import { registerSchema, registerSchemaType } from "@/lib/zodSchema/userSchema";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Briefcase, Loader2, User } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { startTransition, useActionState, useEffect } from "react";
import { registerUser } from "@/app/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, {
    success: false,
    error: "",
  });

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "SEEKER",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/login");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function onSubmit(values: registerSchemaType) {
    startTransition(() => {
      formAction(values);
    });
  }
  return (
    <Card className="w-full flex shadow md:w-1/2 lg:w-1/3">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center mb-0">
          Create Account
        </CardTitle>
        <CardDescription className="text-center">
          Join us and start your journey today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue="SEEKER"
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])]:border-blue-500 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                          <FormControl>
                            <RadioGroupItem
                              value="SEEKER"
                              className="sr-only"
                            />
                          </FormControl>
                          <User className="mb-2 h-6 w-6" />
                          Job Seeker
                        </FormLabel>
                      </FormItem>

                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])]:border-blue-500 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                          <FormControl>
                            <RadioGroupItem
                              value="RECRUITER"
                              className="sr-only"
                            />
                          </FormControl>
                          <Briefcase className="mb-2 h-6 w-6" />
                          Recruiter
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <TypographyP className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="hover:underline font-medium">
            Sign in
          </Link>
        </TypographyP>
      </CardFooter>
    </Card>
  );
}
