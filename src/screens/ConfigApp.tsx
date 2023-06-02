import React from "react";
// import DeviceInfo from "react-native-device-info";
import { ColorSchemeName, Text, View } from "react-native";
import DefaultButton from "../components/DefaultButton";
import { useNavigation } from "@react-navigation/core";

interface IConfigAppProps {
  theme: ColorSchemeName;
}

export const ConfigApp: React.FC<IConfigAppProps> = () => {
  const navigation = useNavigation();
  // DeviceInfo.getMacAddress().then((mac) => {
  //   console.log("MAC address:", mac);
  // });

  const handleConnectDevice = () => {
    navigation.navigate("MainStack", { screen: "FinalContact" });
  };

  const handleGoToEditConfig = () => {
    navigation.navigate("MainStack", { screen: "EditConfig" });
  };

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
        <Text style={{ fontSize: 35 }}>Device connected!</Text>
        <Text style={{ fontSize: 20 }}>MAC Address: 11:22:33:44:55:66</Text>
      </View>
      <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 20, paddingBottom: 50, justifyContent: "center" }}>
        <DefaultButton
          style={{ marginBottom: 10 }}
          color="primary"
          text="View Live Data"
          onPress={handleConnectDevice}
        ></DefaultButton>
        <DefaultButton
          style={{ marginBottom: 10 }}
          color="primary"
          text="Edit Configuration"
          onPress={handleGoToEditConfig}
        ></DefaultButton>
        <DefaultButton
          style={{ marginBottom: 10 }}
          color="primary"
          text="Sensor Settings"
          onPress={() => null}
        ></DefaultButton>
        <DefaultButton color="primary" text="Firmware Update" onPress={() => null}></DefaultButton>
      </View>
    </View>
  );
};
