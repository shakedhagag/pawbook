import { ReduxProvider } from "@/store/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthBarrier from "@/components/AuthBarrier";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawBook",
  description: "Your pet's social network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <ReduxProvider>
          <AuthBarrier>{children}</AuthBarrier>
        </ReduxProvider>
      </body>
    </html>
  );
}
