import { AppDispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAppLanguage, APP_ENV } from "configs";
import i18next from "i18next";

import { ILanguageState } from "./interface";

export const languageSlice = createSlice({
  initialState: {
    systemLanguage: APP_ENV.APP_DEFAULT_LANGUAGE
  },
  name: "language",
  reducers: {
    setLanguage: (state: ILanguageState, action: PayloadAction<IAppLanguage>) => {
      return { ...state, systemLanguage: action.payload };
    }
  }
});

const { setLanguage } = languageSlice.actions;

export const initializeLanguage = (defaultLang?: IAppLanguage): any => {
  return (dispatch: AppDispatch) => {
    try {
      console.log({ defaultLang });
      const navigatorLanguage = navigator?.languages?.[0] || navigator?.language;

      const language = defaultLang || navigatorLanguage || APP_ENV.APP_DEFAULT_LANGUAGE;

      i18next.changeLanguage(language);

      dispatch(setLanguage(language as IAppLanguage));
    } catch (error) {
      console.log(`initialize language error ${error}`);
    }
  };
};

export const changeLanguage = (language: IAppLanguage): any => {
  return async (dispatch: AppDispatch) => {
    try {
      i18next.changeLanguage(language);
      dispatch(setLanguage(language));
    } catch (error) {
      console.log(`change language error ${error}`);
    }
  };
};

export default languageSlice.reducer;
