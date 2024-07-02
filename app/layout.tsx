import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

//const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Passport",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={raleway.className}>
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
