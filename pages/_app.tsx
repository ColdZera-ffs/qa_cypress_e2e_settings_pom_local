import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import Footer from "components/common/Footer";
import Navbar from "components/common/Navbar";
import { googleAnalyticsId, isDemo, isProduction } from "config";
import { APP_NAME } from "lib/utils/constant";
import "ionicons/css/ionicons.min.css";
import "style.scss";
import { AppContext, AppContextProvider } from 'libts'

function MyHead() {
  const { title } = React.useContext(AppContext)
  let realTitle = title === undefined ? '' : title + ' - '
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <title>{realTitle + APP_NAME}</title>
    </Head>
  )
}

function handleRouteChange(url) {
  window.gtag('config', googleAnalyticsId, {
    page_path: url,
  })
}

const MyApp = ({ Component, pageProps }) => {
  if (isProduction) {
    // Google Analytics page switches:
    // https://stackoverflow.com/questions/60411351/how-to-use-google-analytics-with-next-js-app/62552263#62552263
    const router = useRouter();
    React.useEffect(() => {
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router.events]);
  }
  return (
    <AppContextProvider>
      <MyHead />
      <Navbar />
      {isDemo && (
        <div className="container" style={{'marginBottom': '20px'}}>
          Source code for this website: <a href="https://github.com/cirosantilli/node-express-sequelize-nextjs-realworld-example-app">https://github.com/cirosantilli/node-express-sequelize-nextjs-realworld-example-app</a>
        </div>
      )}
      <Component {...pageProps} />
      <Footer />
    </AppContextProvider>
  )
};

export default MyApp;
