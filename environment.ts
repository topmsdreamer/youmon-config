import { APP_ENV } from "@env";
import Constants from "expo-constants";
interface IEnvironment {
  name: string;
  tenant: string;
  apiUrl: string;
  auth0Domain: string;
  auth0ClientId: string;
}

export const getEnvironment = () => {
  const configEnv = Constants?.expoConfig?.extra?.appEnv;
  const appEnv = configEnv ? configEnv : APP_ENV !== undefined ? APP_ENV : "default";
  const environment: IEnvironment = {
    name: "DEVELOPMENT",
    tenant: "nimbus",
    apiUrl: "nimbus.biz.v4.dev.youmoni.com",
    auth0Domain: "youmoni-dev.eu.auth0.com",
    auth0ClientId: "CNcuzfbceZ0ZRZMqW1zM9RlWqnG4RHzO"
  };

  if (appEnv.indexOf("default") !== -1) {
    return {
      name: "DEVELOPMENT",
      tenant: "nimbus",
      apiUrl: "nimbus.biz.v4.dev.youmoni.com",
      auth0Domain: "youmoni-dev.eu.auth0.com",
      auth0ClientId: "CNcuzfbceZ0ZRZMqW1zM9RlWqnG4RHzO"
    };
  }
  if (appEnv.indexOf("test") !== -1) {
    return {
      name: "TEST",
      tenant: "nimbus",
      apiUrl: "nimbus.biz.v4.test.youmoni.com",
      auth0Domain: "youmoni-dev.eu.auth0.com",
      auth0ClientId: "CNcuzfbceZ0ZRZMqW1zM9RlWqnG4RHzO"
    };
  }
  if (appEnv.indexOf("stage") !== -1) {
    return {
      name: "STAGE",
      tenant: "nimbus",
      apiUrl: "nimbus.biz.v4.stage.youmoni.com",
      auth0Domain: "youmoni-production.eu.auth0.com",
      auth0ClientId: "jXQqz9VdV6bPSfKw3yjKKkgqJvVRihf2"
    };
  }
  if (appEnv.indexOf("prod") !== -1) {
    return {
      name: "PRODUCTION",
      tenant: "nimbus",
      apiUrl: "nimbus.v4.consumer.app.youmoni.mobi",
      auth0Domain: "youmoni-production.eu.auth0.com",
      auth0ClientId: "jXQqz9VdV6bPSfKw3yjKKkgqJvVRihf2"
    };
  }

  return environment;
};
