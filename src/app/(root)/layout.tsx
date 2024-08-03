import { Navbar } from "@/components/navbar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
