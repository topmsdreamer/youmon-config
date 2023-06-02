import React from "react";

import { StyleProp, Text, TextStyle } from "react-native";

interface IDefaultTextProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "strong" | "p";
  color?: "dark" | "light";
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const DefaultText = (props: IDefaultTextProps) => {
  let tagStyle = {};
  switch (props.tag) {
    case "h1":
      tagStyle = { fontSize: 28, fontWeight: "600", marginBottom: 10 };
      break;
    case "h2":
      tagStyle = { fontSize: 24, fontWeight: "600" };
      break;
    case "h3":
      tagStyle = { fontSize: 22, fontWeight: "600" };
      break;
    case "h4":
      tagStyle = { fontSize: 20, fontWeight: "600" };
      break;
    case "h5":
      tagStyle = { fontSize: 18, fontWeight: "600" };
      break;
    case "strong":
      tagStyle = { fontWeight: "600" };
      break;
    default:
      tagStyle = { fontSize: 16 };
  }

  const styles = { ...props.style, ...tagStyle };
  const textStyle =
    props.style !== undefined ? [styles, styles, props.style] : styles;

  return <Text style={textStyle}>{props.children}</Text>;
};
