import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mahi Abdulhakim - Full-Stack Developer & AI Specialist",
  description:
    "Portfolio of Mahi Abdulhakim - Full-Stack Web Developer, AI Automation Specialist, Photographer, and Content Creator",
  keywords: "full-stack developer, AI automation, Next.js, photography, videography, content creator",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>{children}</body>
      <Analytics/>
    </html>
  )
}
