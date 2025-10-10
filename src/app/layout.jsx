import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Lo-Fi Scape",
  description:
    "Curate your perfect productivity envrionment. Mix calming LoFi beats with custom ambient soundscapes, from gentle rain to a lively cafe.",
  openGraph: {
    title: "Lo-Fi Scape: Minimal Mixer for Focus",
    description:
      "Curate your perfect productivity envrionment. Mix calming LoFi beats with custom ambient soundscapes, from gentle rain to a lively cafe.",
    url: "https://lofiscape.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://lofiscape.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lo-Fi Scape Preview",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${"night-theme"}`}>
      <body>
        <Analytics />
        {children}
        <script src="https://www.youtube.com/iframe_api"></script>
      </body>
    </html>
  );
}
