import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="relative flex h-full flex-col px-4 pt-14">
      <h1 className="text-3xl font-bold">Contact Page</h1>
      <p className="text-xl">Contact Page</p>
      <Button className="mt-4" asChild>
        <Link href="/" className="text-blue-500 hover:underline">
          Go to Home Page
        </Link>
      </Button>
    </div>
  );
}
