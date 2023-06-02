import React from "react";
import { ColorSchemeName, Image, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DefaultButton from "../components/DefaultButton";
import { useNavigation } from "@react-navigation/core";

interface IMainProps {
  theme: ColorSchemeName;
}

export const Main: React.FC<IMainProps> = () => {
  const navigation = useNavigation();

  const handleGoToConnectDevice = () => {
    navigation.navigate("MainStack", { screen: "ConfigApp" });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}>
        <SafeAreaView style={{ flex: 1, marginHorizontal: 10, marginBottom: 10, justifyContent: "center" }}>
          <DefaultButton
            style={{ marginBottom: 10 }}
            color="primary"
            text="Connect To Existing Device"
            onPress={handleGoToConnectDevice}
          ></DefaultButton>
          <DefaultButton color="primary" text="Deploy New Device" onPress={() => null}></DefaultButton>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
