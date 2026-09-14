import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechnoFluency — Ingles tecnico para profissionais de tecnologia",
  description:
    "Plataforma gamificada para aprender o ingles que devs e profissionais de TI realmente usam no trabalho. Do primeiro bug report a conversa com o tech lead.",
};

export const viewport: Viewport = {
  themeColor: "#0a0426",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
