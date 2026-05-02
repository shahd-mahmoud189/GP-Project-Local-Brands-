import Footer from "./_components/sharedComponents/Footer/Footer";
import Nav from "./_components/sharedComponents/Nav/Nav";
import { Exo } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import './globals.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from "./providers/Providers";
import { getAuthData, getMyRequestData } from "./server/auth.actions";
import { getMyBrands } from "./api/serverFunction/serverFunctions.api";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});


export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const authData = await getAuthData();
  const brandRequestData = await getMyRequestData();
  const myBrand = await getMyBrands();

  const preloadedState = {
    auth: authData ? authData : { isAuthinticated: false, userInfo: null },
    brandRequest: brandRequestData 
  ? { 
      requestStatusText: brandRequestData.requestStatusText ?? '', 
      requestDate: brandRequestData.requestDate ?? '' 
    } 
  : { requestStatusText: '', requestDate: '' },
    brand: myBrand? myBrand[0]: {brandId:null}
  };


  return (
    <html lang="en">
      <Providers preloadedState={preloadedState}>
        <body
          className={`${exo.className} font-medium`}
        >
          <Nav />
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
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
