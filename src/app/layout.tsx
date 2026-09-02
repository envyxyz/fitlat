import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/fitlat";

// Inter is the documented fallback for the self-hosted General Sans / Neue
// Montreal display face (see design-fitlat.md "Note on Font Substitutes").
// Swap this for a next/font/local General Sans once the licensed font files
// are added under public/fonts/.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Fitlat",
  description: "Fitlat — train with intent.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col">
        <Loader />
        {children}
      </body>
    </html>
  );
}
