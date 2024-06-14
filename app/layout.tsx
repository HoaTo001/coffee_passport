import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import DashboardSideBar from "@/components/DashboardSideBar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import DashboardTopNav from "@/components/DashboardTopNav";
import Home from "./page";
import Navbar from "@/components/navbar";

//const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
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
      {/*<ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >        
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <DashboardSideBar />
          <DashboardTopNav>
            <main className="flex flex-col gap-4 p-4 lg:gap-4"></main>
            
          </DashboardTopNav>
          
        </div> 
        </ThemeProvider>*/}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
