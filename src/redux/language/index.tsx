import { AppDispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAppLanguage, APP_ENV, constantEnums } from "configs";
import i18next from "i18next";

import { ILanguageState } from "./interface";

export const languageSlice = createSlice({
  initialState: {
    systemLanguage: APP_ENV.APP_DEFAULT_LANGUAGE,
  },
  name: "language",
  reducers: {
    setLanguage: (
      state: ILanguageState,
      action: PayloadAction<IAppLanguage>
    ) => {
      return { ...state, systemLanguage: action.payload };
    },
  },
});

const { setLanguage } = languageSlice.actions;

export const initializeLanguage = (): any => (dispatch: AppDispatch) => {
  try {
    const navigatorLanguage = navigator?.languages?.[0] || navigator?.language;
    const language =
      localStorage.getItem(constantEnums.APP_LANGUAGE) || navigatorLanguage ||
      APP_ENV.APP_DEFAULT_LANGUAGE;
    i18next.changeLanguage(language);
    dispatch(setLanguage(language as IAppLanguage));
  } catch (error) {
    console.log(`initialize language error ${error}`);
  }
};

export const changeLanguage =
  (language: IAppLanguage): any =>
    async (dispatch: AppDispatch) => {
      try {
        localStorage.setItem(constantEnums.APP_LANGUAGE, language);
        i18next.changeLanguage(language);
        dispatch(setLanguage(language));
      } catch (error) {
        console.log(`change language error ${error}`);
      }
    };

export default languageSlice.reducer;
