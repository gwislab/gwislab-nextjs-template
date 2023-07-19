import "../styles/globals.css";
import React, { useEffect } from "react";

import "assets/i18n";
// import { IAppLanguage } from "configs";
import { ApolloProvider } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "hooks";
import useGraphqlClient from "hooks/useGraphqlClient";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { initializeLanguage, store, persistor } from "redux";
import { PersistGate } from "redux-persist/integration/react";
interface ISubAppProps {
  Component: NextComponentType<NextPageContext, any, any>;
}

const SubApp = ({ Component, ...pageProps }: ISubAppProps) => {
  const systemLanguage = useAppSelector((state) => state.language.systemLanguage);
  const dispatch = useAppDispatch();
  const client = useGraphqlClient();

  useEffect(() => {
    dispatch(initializeLanguage(systemLanguage));
    return () => {};
  }, []);
  const { t, i18n } = useTranslation();
  return     <ApolloProvider client={client}>
    <Component {...pageProps} t={t} i18n={i18n} />;
  </ApolloProvider>; 
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SubApp {...pageProps} Component={Component} />
      </PersistGate>
    </Provider>
  );
}
