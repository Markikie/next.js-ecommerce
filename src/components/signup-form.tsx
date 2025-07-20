"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const handleSignUp = async () => {
    await authClient.signUp.email(
      {
        email: "admin@gmail.com",
        password: "Admin1234",
        name: "Admin",
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("loading...", ctx.body);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log("success", ctx.data);
          router.replace("/login");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };
  return (
    <div>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
};
export default SignupForm;
