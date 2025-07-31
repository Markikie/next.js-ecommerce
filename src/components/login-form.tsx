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
import { formSchema } from "@/lib/formShemas";
import { useEffect } from "react";
import { Form } from "./ui/form";
import { FormInput } from "./form-input";
import { IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  // react hook form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.setFocus("email");
  }, [form]);

  // login button
  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: (ctx) => {
          console.log("loading...", ctx.body);
        },
        onSuccess: async (ctx) => {
          console.log("success", ctx.data);
          const { data: session } = await authClient.getSession();
          if (session?.user.role === "user") {
            toast.success("Welcome " + session.user.name);
            router.replace("/");
          } else {
            router.replace("/dashboard");
          }
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
              <div className="flex flex-col gap-6">
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
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                  >
                    {form.formState.isSubmitting ? (
                      <IconLoader className="animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
