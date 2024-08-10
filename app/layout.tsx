import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const Rubi = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOAD-AI",
  description: "Generated by HRITIK YADAV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={Rubi.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
