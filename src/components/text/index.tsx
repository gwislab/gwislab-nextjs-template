import React from "react";

import { Colors } from "configs";
import { createUseStyles } from "react-jss";

import { ITextProps } from "./interface";

const useStyles = ({
  color = "black",
  bgColor = "transparent",
  bold = false,
  italic = false
}: Partial<ITextProps>) =>
  createUseStyles({
    "@global": {
      body: {
        fontFamily: "'Montserrat', sans-serif"
      }
    },
    commonStyles: {
      color: Colors[color],
      backgroundColor: Colors[bgColor],
      fontWeight: bold ? "bold" : "normal",
      fontStyle: italic ? "italic" : "normal"
    }
  });

const Text = ({
  text,
  style = {},
  className,
  href,
  variant = "normal",
  onClick,
  type = "normal",
  isGradient = false,
  gradientColors = { from: "secondary", to: "primary" },
  ...props
}: ITextProps) => {
  const { commonStyles } = useStyles(props)();

  const gradientStyle = isGradient
    ? {
        background: `linear-gradient(119deg, ${Colors[gradientColors.from]} 0%, ${
          Colors[gradientColors.to]
        } 100%)`,
        "--moz-background": `linear-gradient(119deg, ${Colors[gradientColors.from]} 0%, ${
          Colors[gradientColors.to]
        } 100%)`,
        "-webkit-background": `linear-gradient(119deg, ${
          Colors[gradientColors.from]
        } 0%, ${Colors[gradientColors.to]} 100%)`,
        "background-clip": "text",
        "-webkit-background-clip": "text",
        "-moz-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "-moz-text-fill-color": "transparent"
      }
    : {};

  const getVariantFont = () => {
    switch (variant) {
      case "normal":
        return "text-xl";
      case "large":
        return "text-2xl";
      case "xLarge":
        return "text-3xl";
      case "xxLarge":
        return "text-5xl";
      case "mega":
        return "text-7xl";
      case "small":
        return "text-sm";
      case "xsmall":
        return "text-xs";
      default:
        return "text-xl";
    }
  };

  const sharedStyles = {
    style: {
      ...style,
      ...gradientStyle
    },
    className: `${commonStyles} font-text mb-2 ${
      type === "link" ? "underline text-primary" : ""
    } ${getVariantFont()} ${className}`,
    onClick
  };

  switch (type) {
    case "normal":
      return <p {...sharedStyles}>{text}</p>;
    case "h1":
      return <h1 {...sharedStyles}>{text}</h1>;
    case "h2":
      return <h2 {...sharedStyles}>{text}</h2>;
    case "h3":
      return <h3 {...sharedStyles}>{text}</h3>;
    case "h4":
      return <h4 {...sharedStyles}>{text}</h4>;
    case "h5":
      return <h5 {...sharedStyles}>{text}</h5>;
    case "h6":
      return <h6 {...sharedStyles}>{text}</h6>;
    case "link":
      return (
        <a {...sharedStyles} href={href}>
          {text}
        </a>
      );
    default:
      return <p {...sharedStyles}>{text}</p>;
  }
};

export default Text;
