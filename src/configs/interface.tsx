import { ITranslationKeys } from "assets";

export type IAppLanguage = "en" | "fr";
export interface IPageArgs {
  t: (key: ITranslationKeys) => string;
}

export type IColor =
  | "primary"
  | "secondary"
  | "red"
  | "white"
  | "black"
  | "normal"
  | "transparent"
; 