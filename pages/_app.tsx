import "../styles/globals.css";
import React, { useEffect } from "react";

import "assets/i18n";
// import { IAppLanguage } from "configs";
import { useAppDispatch } from "hooks";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { initializeLanguage, store } from "redux";

interface ISubAppProps {
  Component: NextComponentType<NextPageContext, any, any>;
}

const SubApp = ({ Component, ...pageProps }: ISubAppProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeLanguage());
    return () => {};
  }, []);
  const { t, i18n } = useTranslation();
  return <Component {...pageProps} t={t} i18n={i18n} />;
};

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <SubApp {...pageProps} Component={Component} />
    </Provider>
  );
}
