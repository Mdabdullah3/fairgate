import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "@/components/WalletProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FairGate | Decentralized Reputation Vault",
  description: "A high-fidelity Proof of Concept demonstrating FairScale reputation-gated access on Solana. Connect your wallet to verify your on-chain trust score.",
  openGraph: {
    title: "FairGate | Reputation Layer",
    description: "Unlock exclusive DeFi rewards based on your on-chain history.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppWalletProvider>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
