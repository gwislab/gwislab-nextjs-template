import { IColor } from "configs";

export interface IButtonProps {
  text: string;
  bgColor?: IColor;
  textColor?: IColor;
  margin?: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  onClick?: (arg?: any) => any;
}
