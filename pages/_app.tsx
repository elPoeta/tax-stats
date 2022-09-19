import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/theme/ThemeProvider";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Layout } from "../components/layout/Layout";
import { Header } from "../components/header/Header";
import { AuthProvider } from "../context/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Header />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>  
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
