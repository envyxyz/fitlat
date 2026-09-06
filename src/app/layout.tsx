import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/fitlat";
import { content } from "@/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-condensed",
});

export const viewport: Viewport = {
  themeColor: content.site.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(content.site.url),
  title: {
    default: content.site.metaTitle,
    template: `%s · ${content.site.name}`,
  },
  description: content.site.metaDescription,
  applicationName: content.site.name,
  authors: [{ name: content.site.name, url: content.site.url }],
  creator: content.site.name,
  publisher: content.site.name,
  keywords: [
    "Fitlat",
    "Fitlat Gym",
    "Gym Islamabad",
    "Strength and Conditioning Islamabad",
    "Personal Trainer Islamabad",
    "Fitness Islamabad",
    "Weight Training Islamabad",
    "Athletic Training Islamabad",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: content.site.locale,
    url: content.site.url,
    siteName: content.site.name,
    title: content.site.metaTitle,
    description: content.site.metaDescription,
    images: [
      {
        url: content.site.ogImage.url,
        width: content.site.ogImage.width,
        height: content.site.ogImage.height,
        alt: content.site.ogImage.alt,
        type: content.site.ogImage.type,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.site.metaTitle,
    description: content.site.metaDescription,
    images: [
      {
        url: content.site.ogImage.url,
        width: content.site.ogImage.width,
        height: content.site.ogImage.height,
        alt: content.site.ogImage.alt,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
        bebasNeue.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <Loader />
        {children}
      </body>
    </html>
  );
}
