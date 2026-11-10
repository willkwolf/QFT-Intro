import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { NotationProvider } from "@/context/NotationContext";
import Navigation from "@/components/Navigation";
import 'katex/dist/katex.min.css';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Quantum Atlas & QFT Intro | De la Geometría a la Computación Cuántica",
  description: "Plataforma integrada de artefactos interactivos de estudio, notas rigurosas y simulaciones: Mecánica Clásica, Mínima Acción, Orígenes Cuánticos, Teoría Cuántica de Campos y Computación Cuántica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${sourceSerif.variable} antialiased scroll-smooth`}>
      <body className="bg-bg text-text-primary min-h-screen flex flex-col font-sans select-none overflow-x-hidden">
        <NotationProvider>
          <Navigation />
          <div className="flex-1">
            {children}
          </div>
        </NotationProvider>
      </body>
    </html>
  );
}
