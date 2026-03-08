import Footer from "./_components/sharedComponents/Footer/Footer";
import Nav from "./_components/sharedComponents/Nav/Nav";
import { Exo, Geist } from "next/font/google";
import "./globals.css";
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${exo.className} font-medium`}
      >
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
