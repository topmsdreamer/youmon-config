import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Image, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Main } from "../screens/Main";
import { Signup } from "../screens/Signup";
import { getEnvironment } from "../../environment";
import Start from "../screens/Start";
import { ConfigApp } from "../screens/ConfigApp";
import { FinalContact } from "../screens/FinalContact";
import { EditConfig } from "../screens/EditConfig";
import ApiClient from "../../services/api/ApiClient";
import { useAuth0 } from "../utils/auth0";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StartStack = (props: any) => {
  const { navigation } = props;
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerTransparent: false,
        headerLeftContainerStyle: { width: 50 },
        headerTitleAlign: "center",
        headerLeft: (props) => {
          return (
            <View>
              {props.canGoBack && (
                <TouchableOpacity
                  style={{ flex: 1, width: 50, height: 40, justifyContent: "center" }}
                  onPress={() => navigation.goBack()}
                >
                  <FontAwesome5
                    style={{ fontSize: 22, marginLeft: 5, color: "#192a46" }}
                    name={"chevron-left"}
                  ></FontAwesome5>
                </TouchableOpacity>
              )}
            </View>
          );
        },
        headerRight: () => <></>,
        headerTitle: () => (
          <View style={{ alignSelf: "center", overflow: "hidden" }}>
            <Image style={{ height: 30, width: 100, resizeMode: "contain" }} source={require("../assets/logo.png")} />
          </View>
        )
      }}
    >
      <Stack.Screen name="Start" options={{ title: "My Nimbus", headerShown: true }}>
        {(p) => {
          return <Main {...props} {...p} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="ConfigApp" options={{ title: "Connect Device", headerShown: true }}>
        {(p) => {
          return <ConfigApp {...props} {...p} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="ViewData" options={{ title: "View Data", headerShown: true }}>
        {(p) => {
          return <></>;
        }}
      </Stack.Screen>
      <Stack.Screen name="EditConfig" options={{ title: "Edit Config", headerShown: true }}>
        {(p) => {
          return <EditConfig {...props} {...p} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="SensorSettings" options={{ title: "Sensor Settings", headerShown: true }}>
        {(p) => {
          return <></>;
        }}
      </Stack.Screen>
      <Stack.Screen name="FinalContact" options={{ title: "Final Contact", headerShown: true }}>
        {(p) => {
          return <FinalContact {...props} {...p} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const SettingsStack = (props: any) => {
  const { navigation } = props;
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerTransparent: false,
        headerLeftContainerStyle: { width: 50 },
        headerTitleAlign: "center",
        headerLeft: (props: any) => {
          return (
            <View>
              {props.canGoBack && (
                <TouchableOpacity
                  style={{ flex: 1, width: 50, height: 40, justifyContent: "center" }}
                  onPress={() => navigation.goBack()}
                >
                  <FontAwesome5
                    style={{ fontSize: 22, marginLeft: 5, color: "#192a46" }}
                    name={"chevron-left"}
                  ></FontAwesome5>
                </TouchableOpacity>
              )}
            </View>
          );
        },
        headerRight: () => <></>,
        headerTitle: () => (
          <View style={{ alignSelf: "center", overflow: "hidden" }}>
            <Image style={{ height: 30, width: 100, resizeMode: "contain" }} source={require("../assets/logo.png")} />
          </View>
        )
      }}
    >
      <Stack.Screen name="Settings" component={() => <Text>Settings</Text>} options={{ title: "Settings" }} />
    </Stack.Navigator>
  );
};

const TabStack = (props: any) => {
  const { theme, apiClient } = props;
  const bgColor = theme === "dark" ? "#0d1117" : "#fff";
  const activeColor = theme === "dark" ? "#ff593f" : "#ff593f";
  const tabBarStyle = { backgroundColor: bgColor, borderTopWidth: 1, borderTopColor: "#213250" };
  return (
    <Tab.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarShowLabel: false,
        tabBarAllowFontScaling: true,
        headerTintColor: activeColor,
        tabBarLabelStyle: { color: activeColor },
        tabBarItemStyle: { borderTopWidth: 0 }
      }}
    >
      <Tab.Screen
        name="MainStack"
        options={{
          headerTransparent: false,
          headerShown: false,
          tabBarStyle: tabBarStyle,
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 30, height: 30, resizeMode: "contain" }}
              source={require("../assets/youmoni-icon.png")}
            ></Image>
          )
        }}
      >
        {(p) => <StartStack {...p} {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="SettingsStack"
        listeners={({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) })}
        options={{
          headerTransparent: true,
          unmountOnBlur: true,
          tabBarStyle: tabBarStyle,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-cog" size={size} color={color} />
        }}
      >
        {(p) => <SettingsStack {...p} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { isAuthenticated, token } = useAuth0();
  const colorScheme = useColorScheme();
  const environment = getEnvironment();
  const apiClient: ApiClient = new ApiClient(token, environment.tenant, `https://${environment.apiUrl}`, "987654321");
  const anonymousClient: ApiClient = new ApiClient(
    "anonymous",
    environment.tenant,
    `https://${environment.apiUrl}`,
    "987654321"
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={({ route }) => {
          return {
            gestureEnabled: true,
            cardOverlayEnabled: false,
            headerShown: false,
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#35363A" : "#fff"
            },
            ...TransitionPresets.ModalFadeTransition
          };
        }}
      >
        {isAuthenticated && apiClient && (
          <>
            <RootStack.Screen name="Main">
              {(props) => <TabStack {...props} theme={colorScheme} apiClient={apiClient}></TabStack>}
            </RootStack.Screen>
          </>
        )}
        {!isAuthenticated && (
          <>
            <RootStack.Screen options={{ headerShown: false }} name="Start">
              {(props) => <Start {...props} theme={colorScheme}></Start>}
            </RootStack.Screen>
            <RootStack.Screen name="Signup" options={{ headerShown: false }}>
              {(props) => <Signup {...props} theme={colorScheme}></Signup>}
            </RootStack.Screen>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
