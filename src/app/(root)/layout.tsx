import { Navbar } from "@/components/navbar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="container grid min-h-[100dvh] grid-rows-[auto_1fr]">
      <Navbar />
      {children}
    </div>
  );
}
