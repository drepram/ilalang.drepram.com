import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from '@next/third-parties/google'
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-NEZ5NLCB5P" />
    </SessionProvider>
  );
};

export default App;
