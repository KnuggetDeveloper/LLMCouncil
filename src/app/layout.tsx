import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ModelsProvider } from "@/context/ModelsContext";
import { ProjectProvider } from "@/context/ProjectContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rigorus - Stop Thinking Alone",
  description:
    "Pressure-test your startup's decisions with an AI board of directors. Compare responses from multiple AI models with MultiAsk, Critique Chain, and Pre-mortem workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <AuthProvider>
          <ModelsProvider>
            <ProjectProvider>{children}</ProjectProvider>
          </ModelsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
