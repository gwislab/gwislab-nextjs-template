import React from "react";

import Text from "components/text";
import { Colors } from "configs";

import { IButtonProps } from "./interface";

const Button = ({
  text,
  bgColor = "transparent",
  textColor = "black",
  margin = "m-0",
  borderColor,
  style = {},
  className,
  textOptions,
  onClick,
  type,
  disabled
}: IButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: Colors[bgColor],
        color: Colors[borderColor || textColor],
        borderColor: Colors[borderColor || "transparent"],
        borderWidth: borderColor ? "1px" : "0px",
        margin,
        ...style
      }}
      className={`rounded-md shadow px-5 py-2 w-full ${className}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      type={type}
      disabled={disabled}
    >
      <Text
        onClick={(e) => {
          e.preventDefault();
        }}
        text={text}
        className="mb-[0px!important] text-center"
        {...textOptions}
        color={borderColor || textColor}
      />
    </button>
  );
};

export default Button;
