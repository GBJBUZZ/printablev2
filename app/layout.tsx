import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { NavBar } from "@/components/nav-bar";
import { FileProvider } from "./pdfcompress/FileContext";
import { OrderProvider } from "@/context/orderContext";
import GlobalPusherListener from "@/pusher/globalPusherListener";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { usePathname } from 'next/navigation'
import ClientLayoutWrapper from "./ClientLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Printable",
  description: "one stop document printing solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastContainer />
          <GlobalPusherListener />
          <FileProvider>
            <OrderProvider>
              <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            </OrderProvider>
          </FileProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
