import Footer from "./_components/sharedComponents/Footer/Footer";
import Nav from "./_components/sharedComponents/Nav/Nav";
import { Exo } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import './globals.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthContextProvider from "./context/AuthContext";
import { cookies } from "next/headers";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

const cookie = await cookies()
const token = cookie.get('token')?.value || null
const refreshToken = cookie.get('refreshToken')?.value || null

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo.className} font-medium`}
      >
        <AuthContextProvider initialToken={token} initialRefreshToken={refreshToken}>
        <Nav/>
        {children}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        <Footer/>
        </AuthContextProvider>
      </body>
    </html>
  );
}
