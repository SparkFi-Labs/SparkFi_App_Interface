import Header from "@/ui/Header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SparkFi | Multi-Chain Incubation Platform",
  description: ""
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen w-screen justify-start items-center">
        <Header />
        <div className="flex-1 w-screen overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
