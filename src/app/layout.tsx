import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://zorgpiloten.nl"),
  title: {
    default: "Zorgpiloten | Uw copilot in de zorg",
    template: "%s | Zorgpiloten",
  },
  description:
    "Minder klik- en schrijfwerk op HR en Communicatie. Hugo van den Berk en Nick Wildeboer beginnen bij één terugkerende taak, nemen het team mee en laten het werkend achter in jullie eigen omgeving.",
  openGraph: { locale: "nl_NL", siteName: "Zorgpiloten", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-wolk focus:px-4 focus:py-2 focus:rounded-full"
        >
          Naar de inhoud
        </a>
        <Topbar />
        <main id="inhoud" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
