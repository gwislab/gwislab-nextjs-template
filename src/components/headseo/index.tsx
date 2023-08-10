import React from "react";

import { APP_ENV } from "configs";
import { NextSeo } from "next-seo";

interface IHeadSeoProps {
  title: string;
}

const HeadSeo = ({ title }: IHeadSeoProps) => {
  return (
    <>
      <NextSeo
        title={`${APP_ENV.APP_NAME} - ${title}`}
        description={APP_ENV.APP_DESCRIPTION}
        twitter={{
          handle: APP_ENV.APP_HANDLE_TWITTER,
          site: APP_ENV.APP_SOCIAL_TWITTER
        }}
      />
      <link rel="shortcut icon" href="/vercel.svg" type="image/x-icon" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="auth" content="false" />
      <title>{`${APP_ENV.APP_NAME} - ${title}`}</title>
      <meta name="description" content={APP_ENV.APP_DESCRIPTION} />
      <meta name="keywords" content={APP_ENV.APP_KEYWORDS} />
      <meta
        name="copyright"
        content={`© ${new Date().getFullYear()} ${APP_ENV.APP_NAME}`}
      />
      <meta name="DC.title" content={`${APP_ENV.APP_NAME} - ${title}`} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="image" content={APP_ENV.PREVIEW_IMAGE} />
      <meta name="og:image" content={APP_ENV.PREVIEW_IMAGE} />
      <meta property="og:description" content={APP_ENV.APP_DESCRIPTION} />
      <meta property="og:title" content={`${APP_ENV.APP_NAME} - ${title}`} />
      <meta property="og:url" content={APP_ENV.APP_WEBSITE} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${APP_ENV.APP_NAME} - ${title}`} />
      <meta name="twitter:description" content={APP_ENV.APP_DESCRIPTION} />
      <meta name="twitter:url" content={APP_ENV.APP_WEBSITE} />
      <meta name="twitter:images0" content={APP_ENV.PREVIEW_IMAGE} />
    </>
  );
};

export default HeadSeo;
