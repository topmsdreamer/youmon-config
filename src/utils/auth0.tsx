import React, { useContext, useState, useEffect, createContext } from "react";
import * as AuthSession from "expo-auth-session";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import jwt_decode from "jwt-decode";

export const getRedirectUrl = (domain: string) => {
  const rootUrl = `${AuthSession.makeRedirectUri()}${Constants.appOwnership === "expo" ? "/" : ""}`;
  return `${rootUrl}--/`;
};

interface IAuthProviderProps {
  isAuthenticated: boolean;
  token?: string;
  user?: any;
  login: () => void;
  logout: () => void;
}

const defaulProps: IAuthProviderProps = {
  isAuthenticated: false,
  login: () => undefined,
  logout: () => undefined
};

export const Auth0Context = createContext(defaulProps);
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = (props: any) => {
  const { clientId, domain, children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<any | undefined>(undefined);

  const redirectUri = `${getRedirectUrl(domain)}start`;

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId,
      responseType: "id_token",
      scopes: ["openid", "profile", "email"],
      extraParams: {
        nonce: "nonce"
      }
    },
    { authorizationEndpoint: `https://${domain}/authorize?prompt=true` }
  );

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        return;
      }
      if (result.type === "success") {
        // Retrieve the JWT token and decode it
        const token: string = result.params.id_token;
        setIsAuthenticated(true);
        setToken(token);

        const user = jwt_decode(token);
        setUser(user);
      }
    }
  }, [result]);

  const login = () => {
    promptAsync();
  };

  const logout = async () => {
    const returnUrl = getRedirectUrl(domain);
    WebBrowser.openAuthSessionAsync(
      `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnUrl}`,
      returnUrl
    )
      .then((response: any) => {
        if (Platform.OS === "android") {
          setIsAuthenticated(false);
          setToken(undefined);
          setUser(undefined);
        }
        if (response.type === "success") {
          setIsAuthenticated(false);
          setToken(undefined);
          setUser(undefined);
        }
      })
      .catch((error: any) => {});
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        token,
        user,
        login,
        logout
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
