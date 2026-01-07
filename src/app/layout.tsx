import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ModelsProvider } from "@/context/ModelsContext";
import { ProjectProvider } from "@/context/ProjectContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "MultiModel GPT - Compare AI Models",
  description:
    "Compare responses from multiple AI models side by side. Supports MultiAsk and Critique Chain workflows with project-level memory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
