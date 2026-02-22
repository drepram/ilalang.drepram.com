// components/Layout.tsx
import React, { ReactNode, useState, useEffect } from "react";
import Router from "next/router";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
  showFooter?: boolean;
};

const Layout: React.FC<Props> = ({ children, showFooter = true }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, []);

  return (
    <div className="site-shell">
      <div className="surface-panel overflow-hidden">
        <Header />
        <main className="px-4 pb-8 sm:px-8">{children}</main>
        {showFooter && <Footer />}
      </div>
      {isLoading && (
        <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-[#d4b487]">
          <div className="h-full w-full animate-pulse bg-[#8d3a26]" />
        </div>
      )}
    </div>
  );
};

export default Layout;
