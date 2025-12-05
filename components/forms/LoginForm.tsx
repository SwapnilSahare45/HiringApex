"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TypographyP } from "../ui/typography";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/lib/zodSchema/userSchema";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { userLogin } from "@/app/actions/auth.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(userLogin, {
    success: false,
    error: "",
  });

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      if ("redirectTo" in state && state.redirectTo) {
        router.push(state.redirectTo);
      } else {
        router.push("/");
      }
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function onSubmit(values: loginSchemaType) {
    startTransition(() => {
      formAction(values);
    });
  }
  return (
    <Card className="w-full flex shadow md:w-3/5 lg:w-1/3">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center mb-0">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Log in to your account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your login email"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="Enter your login password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <TypographyP className="text-center text-sm text-gray-500">
          {`Don't have an account? `}
          <Link href="/register" className="hover:underline font-medium">
            Sign up
          </Link>
        </TypographyP>
      </CardFooter>
    </Card>
  );
}
