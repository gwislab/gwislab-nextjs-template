import "../styles/globals.css";
import React, { useEffect } from "react";

import "assets/i18n";
// import { IAppLanguage } from "configs";
import { ApolloProvider } from "@apollo/client";
import { Footer, Header, Loading } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import useGraphqlClient from "hooks/useGraphqlClient";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { initializeLanguage, store, persistor, IAppState } from "redux";
import { toggleMenu } from "redux/system";
import { PersistGate } from "redux-persist/integration/react";
interface ISubAppProps {
  Component: NextComponentType<NextPageContext, any, any>;
}

const SubApp = ({ Component, ...pageProps }: ISubAppProps) => {
  const { systemLanguage } = useAppSelector((state: IAppState) => state.language);
  const { showMenu, loading } = useAppSelector((state: IAppState) => state.system);

  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const client = useGraphqlClient();

  useEffect(() => {
    dispatch(initializeLanguage(systemLanguage));
    return () => {};
  }, []);

  return (
    <div
      onClick={() => {
        if (showMenu) {
          dispatch(toggleMenu());
        }
      }}
    >
      {loading ? (
        <div className="absolute flex justify-center items-center, w-full h-[100vh] z-50 bg-[#ffffff90]">
          <Loading />
        </div>
      ) : undefined}
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Component {...pageProps} t={t} i18n={i18n} />
          <Footer />
        </PersistGate>
      </ApolloProvider>
    </div>
  );
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SubApp {...pageProps} Component={Component} />
    </Provider>
  );
}
