import React from "react";

import { ITranslationKeys } from "assets";
import { useAppDispatch } from "hooks";
import Head from "next/head";
import { changeLanguage } from "redux";

interface IHomeScreenArgs {
  t: (key: ITranslationKeys) => string;
}

const HomeScreen = ({ t }: IHomeScreenArgs) => {
  // const {editor} = useSelector(state => state.grapes);

  const dispatch = useAppDispatch();
  return (
    <div>
      <Head>
        <title>{t("welcome")}</title>
      </Head>
      <div className=" w-fit flex-col align-center m-auto mb-4">
        <h3 className="text-secondary text-xl">{t("welcome")}</h3>
        <h1 className="text text-5xl font-bold">{`${t(
          "reduxLanguage"
        )}`}</h1>
        <div className="flex align-center pt-4">
          <button
            className="text-white rounded-md shadow bg-primary px-4 py-2 mr-2"
            onClick={() => dispatch(changeLanguage("en"))}
          >
            EN lang
          </button>
          <button
            className="rounded-md shadow bg-secondary px-4 py-2"
            onClick={() => dispatch(changeLanguage("fr"))}
          >
            FR lang
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
