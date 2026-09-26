import type { Metadata, Viewport } from "next";
import { Engagement, Quicksand, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { THEMES } from "@/lib/design-tokens";
import { SITE_NAME, SITE_URL, shareMetadata } from "@/lib/site-metadata";
import { LIGHT_MODE_UI_ENABLED } from "@/lib/site-theme";
import { NIGHT_INIT_SCRIPT } from "@/lib/night-init-script";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const engagement = Engagement({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-engagement",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

// Los íconos (favicon.ico, icon.png, apple-icon.png) y el manifest los enlaza Next desde `app/`.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: "Jhonattan Rodriguez | Growth Hacker, Filmmaker & Developer AI",
  description:
    "Integro, optimizo y escalo lo que ya funciona en tu negocio con metodologías ágiles, contenido e IA. Growth, video y sistemas. Bogotá, Colombia.",
  keywords: [
    "Growth Hacker",
    "Filmmaker",
    "Developer AI",
    "Bogotá",
    "Colombia",
    "Meta Ads",
    "Automatización",
    "Video Marketing",
  ],
  authors: [{ name: "Jhonattan Rodriguez" }],
  ...shareMetadata({
    path: "/",
    slug: "home",
    title: "Jhonattan Rodriguez | Growth Hacker, Filmmaker & Developer AI",
    description:
      "Metodologías ágiles, contenido e IA integrada para escalar sin equipos enormes ni agencias de alto costo. Growth Hacker, Filmmaker y Developer AI.",
    alt: "Jhonattan Rodriguez: Growth Hacker, Filmmaker y Developer AI",
  }),
  // `statusBarStyle: "black"` (opaco): con "black-translucent" el contenido quedaría bajo el notch.
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "black" },
};

// Solo `themeColor`: sin `colorScheme`, para no cambiar los controles nativos del sitio.
export const viewport: Viewport = {
  themeColor: THEMES.index.dark.bg,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script dangerouslySetInnerHTML={{ __html: NIGHT_INIT_SCRIPT }} />
      </head>
      <body
        className={`${engagement.variable} ${quicksand.variable} ${lato.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={LIGHT_MODE_UI_ENABLED}
          forcedTheme={LIGHT_MODE_UI_ENABLED ? undefined : "dark"}
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
