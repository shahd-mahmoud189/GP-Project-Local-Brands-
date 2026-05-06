import Footer from "./_components/sharedComponents/Footer/Footer";
import Nav from "./_components/sharedComponents/Nav/Nav";
import { Exo } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from "./providers/Providers";
import { getAuthData, getMyRequestData } from "./server/auth.actions";
import { getLoggedUserCart } from "./api/cart.api";
import { getMyBrands } from "./api/serverFunction/serverFunctions.api";

import { initialState as cartInitialState } from "./store/slices/cart.slice";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const authData = await getAuthData();
  const brandRequestData = await getMyRequestData();

  let cartData = null;
  let myBrand = null;
  myBrand = await getMyBrands();
if(authData?.userInfo.userType === 'Customer'){

try {
  cartData = await getLoggedUserCart();
} catch (e) {
  cartData = null;
}}
  
  const preloadedState = {
    auth: authData
      ? authData
      : { isAuthinticated: false, userInfo: null },

    brandRequest: brandRequestData
      ? {
          requestStatusText: brandRequestData.requestStatusText ?? "",
          requestDate: brandRequestData.requestDate ?? "",
        }
      : { requestStatusText: "", requestDate: "" },

    cart: {
      ...(cartData || cartInitialState),
      isLoading: false,
      error: null,
    },

    brand: myBrand? myBrand[0]: {brandId:null}
  };

  return (
    <html lang="en">
      <Providers preloadedState={preloadedState}>
        <body className={`${exo.className} font-medium`}>
          {/* {authData?.userInfo.userType === 'Customer'&&<Nav />} */}
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