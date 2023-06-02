import React from "react";
import styled from "styled-components/native";
import { StyleProp, View, ViewStyle } from "react-native";

const PrimaryButton = styled.TouchableOpacity`
  background-color: #192a46;
  border-radius: 10px;
  padding-vertical: 20px;
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: #bf2c37;
`;

const LightButton = styled(PrimaryButton)`
  background-color: #f6f6f6;
`;

interface IDefaultButtonProps {
  color?: "primary" | "secondary" | "light";
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Title = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

const LightText = styled(Title)`
  color: #fff;
`;

const PrimaryText = styled(Title)`
  color: #192a46;
`;

export default (props: IDefaultButtonProps) => {
  switch (props.color) {
    case "light":
      return (
        <LightButton style={props.style} onPress={props.onPress}>
          <View style={{ alignItems: "center" }}>
            <PrimaryText>{props.text}</PrimaryText>
          </View>
        </LightButton>
      );
    case "secondary":
      return (
        <SecondaryButton style={props.style} onPress={props.onPress}>
          <View style={{ alignItems: "center" }}>
            <LightText>{props.text}</LightText>
          </View>
        </SecondaryButton>
      );
    default:
      return (
        <PrimaryButton style={props.style} onPress={props.onPress}>
          <View style={{ alignItems: "center" }}>
            <LightText>{props.text}</LightText>
          </View>
        </PrimaryButton>
      );
  }
};
