import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Lo-Fi Scape",
  description:
    "Curate your perfect productivity envrionment. Mix calming LoFi beats with custom ambient soundscapes, from gentle rain to a lively cafe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${"green-theme"}`}>
      <body>
        <Analytics />
        {children}
        <script src="https://www.youtube.com/iframe_api"></script>
      </body>
    </html>
  );
}
