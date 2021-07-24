// import '../src/assets/styles/globals.scss';

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;
import '../src/assets/styles/scss/global.scss';
import 'antd/dist/antd.less';
require('../src/assets/styles/variables.less');
import { useTranslation } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import nextI18NextConfig from '../next-i18next.config.js';
import SEO from '../next-seo.config';
import darkTheme from '../src/assets/styles/theme/dark.js';
import GlobalStyles from '../src/assets/styles/theme/global';
import lightTheme from '../src/assets/styles/theme/light.js';

const App = ({ Component, pageProps }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };
  const { t } = useTranslation();

  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Component {...pageProps} t={t} toggleTheme={toggleTheme} isLightTheme={isLightTheme} />
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
