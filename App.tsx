import React from "react";
import { StatusBar } from "react-native";
import { Navigation } from "./src/navigation/Navigation";
import { Auth0Provider } from "./src/utils/auth0";
import { getEnvironment } from "./environment";
import useCachedResources from "./src/hooks/useCachedResources";

export const App = () => {
  const isLoadingComplete = useCachedResources();
  const environment = getEnvironment();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Auth0Provider clientId={environment.auth0ClientId} domain={environment.auth0Domain}>
        <StatusBar barStyle={"dark-content"} />
        <Navigation />
      </Auth0Provider>
    );
  }
};

export default App;
