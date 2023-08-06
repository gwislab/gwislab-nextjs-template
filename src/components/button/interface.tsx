import { ITextProps } from "components/text/interface";
import { IColor } from "configs";

export interface IButtonProps {
  text: string;
  bgColor?: IColor;
  textColor?: IColor;
  borderColor?: IColor;
  margin?: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  onClick?: (arg?: any) => any;
  textOptions?: ITextProps;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}
