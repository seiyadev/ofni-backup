import "@/styles/globals.css";
import "@/styles/scrollBar.css";
import "aos/dist/aos.css";
import Head from "next/head";
import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProviderWrapper } from "@/contexts/themeContext";
import { Provider } from "react-redux";
import { store } from "./api/store";
import AlertDownloadApp from "./components/General/AlertDownloadApp";
import UAParser from "ua-parser-js";
import { AuthProvider } from "@/contexts/authContext";
import GetUser from "./components/Auth/GetUser";

export default function App({ Component, pageProps }) {
  const [showAlert, setShowAlert] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parser = new UAParser();
      const result = parser.getResult();
      const isMobile = result.device.type === "mobile";
      setShowAlert(isMobile);
    }
  }, []);

  return (
    <AuthProvider>
      <Head>
        <title>OFNI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="no-referrer" />
        <link rel="Shortcut Icon" type="image/ico" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <GetUser>
          <ThemeProviderWrapper>
            <CssBaseline enableColorScheme />
            <Component {...pageProps} />
            {showAlert ? <AlertDownloadApp /> : <></>}
          </ThemeProviderWrapper>
        </GetUser>
      </Provider>
    </AuthProvider>
  );
}
