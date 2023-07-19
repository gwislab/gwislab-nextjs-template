import React from "react";

import { ITranslationKeys } from "assets";
import { Button } from "components";
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
        <h1 className="text text-5xl font-bold">{`${t("reduxLanguage")}`}</h1>
        <div className="flex align-center pt-4">
          <Button
            text={"EN lang"}
            onClick={() => dispatch(changeLanguage("en"))}
            className="mr-4"
          />
          <Button
            text={"FR lang"}
            bgColor="primary"
            onClick={() => dispatch(changeLanguage("fr"))}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
