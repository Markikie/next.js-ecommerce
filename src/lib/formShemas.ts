import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Please enter a valid email" })
    .email({ message: "Please enter a valid email" })
    .trim(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
});

// Add signup schema
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .trim(),
  email: z
    .string()
    .min(3, { message: "Please enter a valid email" })
    .email({ message: "Please enter a valid email" })
    .trim(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
  confirmPassword: z
    .string()
    .min(4, { message: "Please confirm your password" })
    .trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
