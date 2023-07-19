import "grapesjs/dist/css/grapes.min.css";
import "../styles/globals.css";
import React from "react";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "../src/redux/store";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
