import Link from "next/link";
import { Button } from "../ui/button";

interface AppButtonProps {
  text: string;
  href: string;
}

const AppButton = ({ text, href }: AppButtonProps) => {
  return (
    <Link href={href}>
      <Button className="rounded-full cursor-pointer">{text}</Button>
    </Link>
  );
};
export default AppButton;
