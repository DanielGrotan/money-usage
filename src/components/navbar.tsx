import { UserButton } from "@clerk/nextjs";

type NavbarProps = {};

export function Navbar({}: NavbarProps) {
  return (
    <div className="flex justify-end pt-4">
      <UserButton showName />
    </div>
  );
}
