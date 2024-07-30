import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Register with Firebase",
  description: "Sign up to access our platform powered by Firebase. Enjoy seamless authentication, secure data storage, and robust backend services for your applications. Get started with easy-to-use tools that help you build and scale your projects efficiently."
};

export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-base ${inter.className}`}>{children}</body>
    </html>
  );
}
