"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignupForm = () => {
  const handleSignUp = async () => {
    await authClient.signUp.email(
      {
        email: "wryfe@example.com",
        password: "123456",
        name: "Use1 Doe",
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("loading...", ctx.body);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
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
