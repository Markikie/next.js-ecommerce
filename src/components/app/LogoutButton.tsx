"use client";

import { IconLogout } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
        },
      },
    });
  };

  return (
    <>
      <Button
        onClick={handleLogout}
        className="rounded-full cursor-pointer bg-red-600 hover:bg-red-800"
      >
        <IconLogout />
        Logout
      </Button>
    </>
  );
};
export default LogoutButton;
