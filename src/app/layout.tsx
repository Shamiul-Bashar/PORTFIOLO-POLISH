import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { site } from "@/data/site";
import "./globals.css";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-display" });
const bodyFont = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const loaderFont = Space_Grotesk({ weight: "700", subsets: ["latin"], display: "swap", variable: "--font-loader" });

export const metadata: Metadata = {
  title: { default: `${site.shortName} | Software & Systems`, template: `%s | ${site.shortName}` },
  description: site.summary,
  // Set metadataBase once the final new-repository deployment URL is known.
  openGraph: { title: site.name, description: site.summary, type: "website" },
};
export const viewport: Viewport = { themeColor: "#0A0A0A" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${bodyFont.variable} ${loaderFont.variable}`}>
      <body>
        <LoadingScreen>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SmoothScrollProvider />
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        </LoadingScreen>
      </body>
    </html>
  );
}
