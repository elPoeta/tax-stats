import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/theme/ThemeProvider";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Layout } from "../components/layout/Layout";
import { Header } from "../components/header/Header";
import supabase from "../supabase/supabaseClient";
import { useEffect } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { AuthProvider } from "../context/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange((event:AuthChangeEvent, session) => {
      
  //     if (event === 'SIGNED_IN') { 
  //        console.log('Session ',session)
  //       console.log('IN',event)
  //     }
  //     if (event === 'SIGNED_OUT') {
  //       console.log('OUT',event)
  //     }
  //   })
  //   return () => {
  //     console.log('EXCUTE')
  //     authListener?.unsubscribe()
  //   }
  //   // (async()=> {
  //   //   await supabase.auth.signOut();
  //   // })()
  // }, []);
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
