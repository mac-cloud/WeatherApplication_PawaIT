
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {

 

  title: "My App",
  description: "Weather App using Next.js and Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 

  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
