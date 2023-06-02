declare module "@env" {
  export const APP_ENV: string;
}

declare namespace ReactNavigation {
  interface RootParamList {
    MainStack: {
      screen: "Start" | "ConfigApp" | "ViewData" | "EditConfig" | "SensorSettings" | "FinalContact";
    };
    SettingsStack: { screen: "Settings" };
  }
}
