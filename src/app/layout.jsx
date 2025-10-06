import "./globals.css";

export const metadata = {
  title: "Lo-Fi Scape",
  description:
    "Customize your focus with layered ambient sounds and lofi music, designed for productivity and relaxation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${"green-theme"}`}>
      <body>  
        {children}
        <script src="https://www.youtube.com/iframe_api"></script>
      </body>
    </html>
  );
}
