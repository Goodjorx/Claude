import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jordi Segura — AI & Tech",
  description:
    "CEO & Co-founder de CenteIA Education. Ingeniero de telecomunicaciones con Máster en IA. He formado a más de 300.000 personas en inteligencia artificial.",
  keywords: [
    "Jordi Segura",
    "inteligencia artificial",
    "IA",
    "CenteIA",
    "educación IA",
    "AI education",
  ],
  authors: [{ name: "Jordi Segura Pons" }],
  openGraph: {
    title: "Jordi Segura — AI & Tech",
    description:
      "CEO & Co-founder de CenteIA Education. Formando a más de 300.000 personas en IA.",
    url: "https://jordisegura.com",
    siteName: "Jordi Segura",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordi Segura — AI & Tech",
    description: "CEO & Co-founder de CenteIA Education.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
