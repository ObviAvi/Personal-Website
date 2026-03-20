import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const brandSans = Space_Grotesk({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const brandSerif = Cormorant_Garamond({
  variable: "--font-brand-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Avi Aggarwal",
  description: "Avi Aggarwal's Personal Wesbite",
   icons: {
    icon: "/A-Icon.png",          
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${brandSans.variable} ${brandSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
