import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@hexclave/next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { hexclaveServerApp } from "@/hexclave/server";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Plantventory",
  description: "Inventory for plants",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): import("react").JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={hexclaveServerApp}>
          <StackTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster/>
              <Navbar />
              

              {children}
            </ThemeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}