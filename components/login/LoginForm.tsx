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
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState, useActionState, useEffect, startTransition } from "react";
import { Button } from "../ui/button";
import { TypographyMuted } from "../ui/typography";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/app/actions/userActions";
import { toast } from "sonner";
import { loginSchema, loginSchemaType } from "@/lib/schema/userSchema";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [state, formAction, isPending] = useActionState(loginUser, {
    success: false,
    message: "",
    error: "",
    errors: {}
  });

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {

    if (!state.success && state.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          form.setError(field as keyof loginSchemaType, {
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
      router.push("/");
    }

  }, [state]);

  const togglePassword = () => {
    setVisible(!visible);
  };

  const onSubmit = (data: loginSchemaType) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      formData.append(key, value as string);
    });

    startTransition(() => {
      formAction(formData);
    });

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          aria-label="Email Address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    placeholder="Enter your password"
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

        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      <TypographyMuted className="text-center py-2">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold underline underline-offset-2"
        >
          Register
        </Link>
      </TypographyMuted>
    </Form>
  );
}
