import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";

import { BASE_URL, endpoints } from "../config";
import {
  facebookLoginOrRegister,
  appleLoginOrRegister,
  googleLoginOrRegister,
} from "../components/AuthHelper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const setUserAuthContext = (userToken, userInfo) => {
    setUserInfo(userInfo);
    setUserToken(userToken);
    axios.defaults.headers.common["Authorization"] = `Token ${userToken}`;
    SecureStore.setItemAsync("userInfo", JSON.stringify(userInfo));
    SecureStore.setItemAsync("userToken", userToken);
  };

  const clearUserAuthContext = () => {
    setUserInfo(null);
    setUserToken(null);
    axios.defaults.headers.common["Authorization"] = null;
    SecureStore.deleteItemAsync("userInfo");
    SecureStore.deleteItemAsync("userToken");
  };

  const login = (username, password, errorHandle) => {
    axios
      .post(endpoints.login, { username, password })
      .then((res) => {
        setIsLoading(true);
        let data = res.data;

        setUserAuthContext(data.token, data.user);

        console.log(data.user);
        console.log("User Token: " + data.token);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(`Login error: ${JSON.stringify(error.response.data)}`);
        errorHandle(Object.values(error.response.data).pop()[0]);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(endpoints.logout)
      .then((res) => {
        console.log("Logout success.");
      })
      .catch((error) => {
        console.log(`Logout error: ${error}`);
      });

    clearUserAuthContext();

    setIsLoading(false);
  };

  const isTokenValid = async () => {
    const { data } = await axios.get(endpoints.validate_token);
    console.log(`isTokenValid: ${data.valid}`);
    return data.valid === "true";
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await SecureStore.getItemAsync("userInfo");
      let userToken = await SecureStore.getItemAsync("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo && isTokenValid()) {
        axios.defaults.headers.common["Authorization"] = `Token ${userToken}`;
        setUserInfo(userInfo);
        setUserToken(userToken);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(`isLoggedIn error: ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      expoClientId:
        "328077216906-md8bkeubunobhjf86mani6uugeust9et.apps.googleusercontent.com",
      iosClientId:
        "328077216906-8jqjaiaqi7hu583qikokpr13h5te6pa6.apps.googleusercontent.com",
      androidClientId:
        "328077216906-md8bkeubunobhjf86mani6uugeust9et.apps.googleusercontent.com",
      webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
      selectAccount: true,
    });

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "725786042340207",
  });

  const handleSignInUser = (data) => {
    if (data) {
      setUserAuthContext(data.token, data.user);
      console.log(JSON.stringify(data));
    }
  };

  const handleAuthError = () => alert("Unable to authorize.");

  const googleAuth = async () => {
    try {
      const response = await googlePromptAsync();
      if (response.type === "success") {
        setIsLoading(true);
        const { access_token } = response.params;
        console.log(JSON.stringify(response.params));

        const data = await googleLoginOrRegister(access_token);
        handleSignInUser(data);
      }
    } catch (error) {
      handleAuthError();
    } finally {
      setIsLoading(false);
    }
  };

  const facebookAuth = async () => {
    try {
      const response = await fbPromptAsync();
      if (response.type === "success") {
        setIsLoading(true);
        const { access_token } = response.params;
        console.log(JSON.stringify(response.params));

        const data = await facebookLoginOrRegister(access_token);
        handleSignInUser(data);
      }
    } catch (error) {
      handleAuthError();
    } finally {
      setIsLoading(false);
    }
  };

  const appleAuth = async () => {
    try {
      const { identityToken, fullName } = await AppleAuthentication.signInAsync(
        {
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          ],
        }
      );

      if (identityToken) {
        setIsLoading(true);

        const data = await appleLoginOrRegister(
          identityToken
        );
        handleSignInUser(data);
      }
    } catch (error) {
      handleAuthError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        googleAuth,
        facebookAuth,
        appleAuth,
        isLoading,
        userToken,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
