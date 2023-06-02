import React from "react";
import { ColorSchemeName, Text, View } from "react-native";
import DefaultButton from "../components/DefaultButton";

interface IFinalContactProps {
  theme: ColorSchemeName;
}

export const FinalContact: React.FC<IFinalContactProps> = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ marginBottom: 30, fontSize: 35 }}>Bokningen är klar!</Text>
        <Text style={{ fontSize: 20 }}>Nyckeln hämtas på XYZ</Text>
        <Text style={{ fontSize: 20 }}>Vid frågor, kontakta conciergen.</Text>
        <Text style={{ fontSize: 20 }}>Du har även fått ett mail med uppgifterna</Text>
      </View>
      <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 20, paddingBottom: 50, justifyContent: "center" }}>
        <DefaultButton
          style={{ marginBottom: 10 }}
          color="primary"
          text="Villkor och regler"
          onPress={() => null}
        ></DefaultButton>
        <DefaultButton color="primary" text="Till mina bokningar" onPress={() => null}></DefaultButton>
      </View>
    </View>
  );
};
