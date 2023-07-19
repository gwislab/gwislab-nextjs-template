import React from "react";

import { Colors } from "configs";

import { IButtonProps } from "./interface";

const Button = ({
  text,
  bgColor = "secondary",
  textColor = "white",
  margin = "m-0",
  style = {},
  className,
  onClick,
}: IButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: Colors[bgColor],
        color: Colors[textColor],
        margin,
        ...style,
      }}
      className={`rounded-md shadow px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
