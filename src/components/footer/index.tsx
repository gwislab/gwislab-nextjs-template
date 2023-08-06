import React from "react";

import { Text } from "components";
import { APP_ENV } from "configs";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-primary">
      <nav className=" w-[90%] tablet:w-[80%] m-auto py-10">
        <div className="container screen800:flex flex-wrap items-center justify-between mx-auto">
          <Link href={"/"} className="cursor-pointer">
            <div className="flex justify-center items-center">
              <img src={"/logo.jpeg"} width={50} className="cursor-pointer mr-2" />
              <Text text={APP_ENV.APP_NAME} variant="xLarge" color="white" />
            </div>
          </Link>
          <div className="mt-16 screen800:mt-0 flex items-center flex-col justify-center screen800:items-start">
            <div className="flex items-center">
              <FaLocationDot className="text-xl mr-2.5 text-white" />
              <Text
                text={t("location") + ": " + APP_ENV.APP_DEFAULT_TIMEZONE}
                className="mb-0"
                color="white"
                style={{ marginBottom: 0 }}
              />
            </div>
            <div className="flex items-center mt-4">
              <BsFillTelephoneForwardFill className="text-xl mr-2.5 text-white" />
              <Text
                text={t("tel") + ": " + APP_ENV.APP_TEL_PHONE}
                className="mb-0"
                style={{ marginBottom: 0 }}
                color="white"
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-primary flex flex-col justify-center items-center border-t-[1px] border-t-secondary pt-4">
        <Text
          text={t("@2023 All rights Reserved")}
          style={{ fontSize: 14, marginBottom: 0 }}
          color="secondary"
        />
        <Text
          text={t("built by Bisynerd @Gwislab")}
          href="https://gwislab.com"
          type="link"
          style={{ fontSize: 14, marginBottom: 20 }}
          color="secondary"
        />
      </div>
    </div>
  );
};

export default Footer;
