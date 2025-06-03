import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from '@/components/WagmiProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Are You Smarter Quiz",
  description: "Test your knowledge with a 5th-grade level quiz! Pay 0.1 CELO to unlock and challenge yourself.",
  metadataBase: new URL('https://miniapp-quiz.vercel.app'),
  other: {
    'fc:frame': JSON.stringify({
      version: "next",
      imageUrl: "https://miniapp-quiz.vercel.app/quiz-2.png",
      button: {
        title: "Start Quiz",
        action: {
          type: "launch_frame",
          name: "Are You Smarter Quiz",
          url: "https://miniapp-quiz.vercel.app",
          splashImageUrl: "https://miniapp-quiz.vercel.app/quiz-1.png",
          splashBackgroundColor: "#EAB308"
        }
      }
    })
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WagmiProvider>
          {children}
        </WagmiProvider>
      </body>
    </html>
  );
}
