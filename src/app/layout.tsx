import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Vertex Capital Finance Ltd",
  description:
    "Structured investment solutions for individuals and businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#071426] text-white min-h-screen">

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
        <ChatWidget />

        <Toaster position="top-right" />
      
      </body>
    </html>
  );
}