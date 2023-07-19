import { ITranslationKeys } from "assets";

export type IAppLanguage = "en" | "fr";
export interface IPageArgs {
  t: (key: ITranslationKeys) => string;
}
