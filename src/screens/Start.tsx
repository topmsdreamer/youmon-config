import React, { useEffect } from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DefaultButton from "../components/DefaultButton";
import { getEnvironment } from "../../environment";
import { useAuth0 } from "../utils/auth0";

const colors: any = {
  DEVELOPMENT: "#4BBF73",
  TEST: "#005591",
  STAGE: "#f0ad4e",
  PRODUCTION: "#d9534f"
};

export const Start = (props: any) => {
  const { login } = useAuth0();
  const { navigation } = props;
  const environment = getEnvironment();

  useEffect(() => {
    if (environment.name !== "PRODUCTION") {
      navigation.setOptions({
        headerShown: true,
        headerStyle: { backgroundColor: colors[environment.name] !== undefined ? colors[environment.name] : "#000" },
        headerTitle: (props: any) => <EnvironmentBanner environment={environment} />
      });
    }
  }, [navigation, environment]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ height: "100%", width: "100%", resizeMode: "cover", position: "absolute" }}
        source={require("../assets/start.jpg")}
      ></Image>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            style={{ width: "100%", alignSelf: "center", height: 150, resizeMode: "contain" }}
            source={require("../assets/logo.png")}
          />
        </View>

        <SafeAreaView style={{ flex: 1, marginHorizontal: 10, marginBottom: 10, justifyContent: "flex-end" }}>
          <DefaultButton
            style={{ marginBottom: 10 }}
            color="primary"
            text="Sign in"
            onPress={() => login()}
          ></DefaultButton>
          {/* <DefaultButton color="secondary" text="Skapa konto" onPress={() => navigation.navigate({ name: 'Signup' })}></DefaultButton> */}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const EnvironmentBanner = (props: any) => {
  const { environment } = props;
  const bgColor = colors[environment.name] !== undefined ? colors[environment.name] : "#000";
  return (
    <>
      {environment?.name !== undefined && environment.name !== "PRODUCTION" && (
        <View style={{ backgroundColor: bgColor, justifyContent: "center", height: 20, width: "100%" }}>
          <Text style={{ textAlign: "center", color: "#fff" }}>{environment.name}</Text>
          <Text style={{ textAlign: "center", color: "#fff" }}>({environment.apiUrl})</Text>
        </View>
      )}
    </>
  );
};

export default Start;
