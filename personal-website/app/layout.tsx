import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jordisegura.com/#jordi",
      name: "Jordi Segura Pons",
      url: "https://jordisegura.com",
      jobTitle: "CEO & Co-founder",
      description:
        "Ingeniero de Telecomunicaciones con Máster en IA por la UPC y formación en el MIT. Ha formado a más de 500.000 personas en inteligencia artificial en 32 países. Co-fundador de CenteIA Education.",
      image: "https://jordisegura.com/jordi-studio.jpg",
      worksFor: {
        "@type": "Organization",
        "@id": "https://jordisegura.com/#centeia",
        name: "CenteIA Education",
        url: "https://www.centeia.com",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Universitat Politècnica de Catalunya (UPC)",
        },
        {
          "@type": "EducationalOrganization",
          name: "Massachusetts Institute of Technology (MIT)",
        },
      ],
      knowsAbout: [
        "Inteligencia Artificial",
        "Machine Learning",
        "Educación tecnológica",
        "Emprendimiento",
        "Transformación digital",
      ],
      sameAs: [
        "https://linkedin.com/in/jordisegurapons",
        "https://instagram.com/jordisegurap",
        "https://tiktok.com/@jordisegurap",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://jordisegura.com/#centeia",
      name: "CenteIA Education",
      url: "https://www.centeia.com",
      founder: { "@id": "https://jordisegura.com/#jordi" },
      description:
        "Plataforma líder de educación en inteligencia artificial en español. Más de 500.000 profesionales formados en 32 países.",
      foundingDate: "2022",
      areaServed: "Worldwide",
      inLanguage: "es",
    },
    {
      "@type": "WebSite",
      "@id": "https://jordisegura.com/#website",
      url: "https://jordisegura.com",
      name: "Jordi Segura",
      description:
        "Web personal de Jordi Segura Pons — CEO de CenteIA Education, ingeniero de IA y formador de 500.000+ profesionales.",
      author: { "@id": "https://jordisegura.com/#jordi" },
      inLanguage: "es",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jordisegura.com"),
  title: {
    default: "Jordi Segura — CEO de CenteIA Education | IA & Emprendimiento",
    template: "%s | Jordi Segura",
  },
  description:
    "CEO y Co-founder de CenteIA Education. Ingeniero de Telecomunicaciones con Máster en IA por la UPC y formación en el MIT. He formado a más de 500.000 personas en IA en 32 países.",
  keywords: [
    "Jordi Segura",
    "Jordi Segura Pons",
    "CenteIA",
    "CenteIA Education",
    "inteligencia artificial",
    "IA",
    "educación IA",
    "AI education",
    "formación inteligencia artificial",
    "curso IA español",
    "emprendimiento IA",
    "CEO inteligencia artificial",
    "500000 personas IA",
  ],
  authors: [{ name: "Jordi Segura Pons", url: "https://jordisegura.com" }],
  creator: "Jordi Segura Pons",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Jordi Segura — CEO de CenteIA Education | IA & Emprendimiento",
    description:
      "CEO y Co-founder de CenteIA Education. He formado a más de 500.000 personas en inteligencia artificial en 32 países.",
    url: "https://jordisegura.com",
    siteName: "Jordi Segura",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/jordi-studio.jpg",
        width: 1200,
        height: 630,
        alt: "Jordi Segura Pons — CEO de CenteIA Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordi Segura — CEO de CenteIA Education",
    description:
      "He formado a más de 500.000 personas en inteligencia artificial en 32 países.",
    images: ["/jordi-studio.jpg"],
  },
  alternates: {
    canonical: "https://jordisegura.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
