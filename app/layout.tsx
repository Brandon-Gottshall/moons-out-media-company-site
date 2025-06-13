import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { SiteLogo } from "@/components/site-logo";

import { Analytics } from "@vercel/analytics/react";

// Process description - accepts string or array of strings with HTML tags
function processDescription(description: string | string[]): string {
  if (typeof description === "string") return description;
  return description
    .map((line) => line.replace(/<[^>]*>/g, ""))
    .join(" ")
    .trim();
}

export const metadata: Metadata = {
  title: "Moons Out Media | Creative Agency",
  description: processDescription([
    "<strong>Connect, Grow, Convert:</strong>",
    "Authentic Storytelling, Targeted Digital Campaigns, and Custom Web, AI & DevOps Solutions – Driving Measurable Growth for Your Brand.",
  ]),
  generator: "v0.dev",
  openGraph: {
    type: "website",
    title: "Moons Out Media | Creative Agency",
    description: processDescription([
      "<strong>Connect, Grow, Convert:</strong>",
      "Authentic Storytelling, Targeted Digital Campaigns, and Custom Web, AI & DevOps Solutions – Driving Measurable Growth for Your Brand.",
    ]),
    // You might want to add a site_name and images here as well
    // site_name: 'Moons Out Media',
    // images: [
    //   {
    //     url: 'https://yourdomain.com/og-image.png', // Replace with your actual OG image URL
    //     width: 1200,
    //     height: 630,
    //     alt: 'Moons Out Media',
    //   },
    // ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body2 cyberpunk bg-cyberpunk-background min-h-screen">
        <div className="relative">
          <Navigation logoSlot={<SiteLogo />} />
          <main className="relative">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
