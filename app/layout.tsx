import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dadan Showcase",
  description:
    "A workshop showcase of weird ideas, new tools, and physical-digital experiments by Dadan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
