import "../styles/globals.css";
import React from "react";

import "assets/i18n";
// import { IAppLanguage } from "configs";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "redux";

interface ISubAppProps {
  Component: NextComponentType<NextPageContext, any, any>;
}

const SubApp = ({ Component, ...pageProps }: ISubAppProps) => {
  const { t, i18n } = useTranslation();
  return <Component {...pageProps} t={t} i18n={i18n} />;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   initializeI18n(
  //     (navigator?.language?.[0] as IAppLanguage) ||
  //       (navigator?.languages as unknown as IAppLanguage)
  //   );
  //   return () => {};
  // }, []);

  return (
    <Provider store={store}>
      <SubApp {...pageProps} Component={Component} />
    </Provider>
  );
}
