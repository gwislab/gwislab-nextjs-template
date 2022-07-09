import 'grapesjs/dist/css/grapes.min.css';
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';

import grapesjs from 'grapesjs';
import { Provider } from 'react-redux';

import grapesConfig from '../grapes.config';
import store from '../src/redux/store';

function MyApp({ Component, pageProps }) {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    setEditor(grapesjs.init(grapesConfig));
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} editor={editor} />
    </Provider>
  );
}

export default MyApp;
