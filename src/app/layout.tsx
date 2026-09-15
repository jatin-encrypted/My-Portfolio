import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { SkipToContent } from "@/components/skip-to-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jatinkukreja.dev"
  ),
  title: {
    default: "Jatin Kukreja — Developer",
    template: "%s | Jatin Kukreja",
  },
  description:
    "Portfolio of Jatin Kukreja. Developer building across AI, Web3, security, and modern software systems.",
  keywords: [
    "developer",
    "portfolio",
    "React",
    "TypeScript",
    "Web3",
    "AI",
    "Python",
  ],
  authors: [{ name: "Jatin Kukreja" }],
  creator: "Jatin Kukreja",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Jatin Kukreja — Developer",
    description:
      "Developer building across AI, Web3, security, and modern software systems.",
    siteName: "Jatin Kukreja",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jatin Kukreja — Developer",
    description:
      "Developer building across AI, Web3, security, and modern software systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jatin Kukreja",
  jobTitle: "Developer",
  description:
    "Developer building across AI, Web3, security, and modern software systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jatinkukreja.dev",
  knowsAbout: [
    "Python",
    "TypeScript",
    "JavaScript",
    "Solidity",
    "SQL",
    "HTML/CSS",
    "React",
    "React Native",
    "FastAPI",
    "Streamlit",
    "Tailwind",
    "Vite",
    "ethers.js",
    "SQLAlchemy",
    "Pydantic",
    "scikit-learn",
    "Firebase Auth",
    "JWT",
    "RBAC",
    "Bcrypt",
    "RSA-256",
    "SHA-256",
    "SQLite",
    "PostgreSQL",
    "Gemini API",
    "Vertex AI",
    "HuggingFace Transformers",
    "PyTorch",
    "Groq",
    "Hardhat",
    "Foundry",
    "Git",
    "GitHub",
    "Docker",
    "EAS Build",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground bg-grid-pattern relative selection:bg-accent/20 selection:text-accent">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SkipToContent />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
