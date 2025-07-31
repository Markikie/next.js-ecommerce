"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/formShemas";
import { useEffect } from "react";
import { Form } from "./ui/form";
import { FormInput } from "./form-input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  // react hook form
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.setFocus("name");
  }, [form]);

  // signup form submission
  const handleOnSubmit = async (data: z.infer<typeof signupSchema>) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onRequest: (ctx) => {
          console.log("loading...", ctx.body);
        },
        onSuccess: (ctx) => {
          console.log("success", ctx.data);
          router.replace("/login");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormInput
                    control={form.control}
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid gap-3">
                  <FormInput
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-3">
                  <FormInput
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="grid gap-3">
                  <FormInput
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Loading..." : "Sign Up"}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupForm;
