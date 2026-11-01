import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyoto Trip Planner",
  description: "Chat prototype that answers trip requests with stay, Experience and food cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
