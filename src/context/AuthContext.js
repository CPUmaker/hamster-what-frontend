import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import React, { createContext, useState, useEffect } from "react";
import { BASE_URL, endpoints } from "../config";

export const AuthContext = createContext();

// const toast = useToast();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (username, password, errorHandle) => {
    axios
    .post(endpoints.login, { username, password })
    .then((res) => {
        setIsLoading(true);
        let data = res.data;
        setUserInfo(data.user);
        setUserToken(data.token);

        axios.defaults.headers.common['Authorization'] = `Token ${data.token}`;
        AsyncStorage.setItem("userInfo", JSON.stringify(data.user));
        AsyncStorage.setItem("userToken", data.token);

        console.log(data.user);
        console.log('User Token: ' + data.token);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(`Login error: ${JSON.stringify(error.response.data)}`);
        errorHandle(Object.values(error.response.data).pop()[0]);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);

    axios.post(endpoints.logout)
    .then((res) => {
        console.log('Logout success.')
    })
    .catch((error) => {
        console.log(`Login error: ${error}`)
    })

    axios.defaults.headers.common['Authorization'] = null;
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");

    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if ( userInfo ) {
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

  const [_, googleResponse, googleAuth] = Google.useAuthRequest({
    expoClientId:
      "1080382822276-eqklp58m1q9fl85m7aj89n1ofp8bdj7p.apps.googleusercontent.com",
    iosClientId:
      "1080382822276-a0ms51p5cfc523bivhchs8nk04u2scq0.apps.googleusercontent.com",
    androidClientId:
      "1080382822276-dqohv9donltabnijor1uun2765hstr4v.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    selectAccount: true,
  });

  const [___, ____, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "723313165600806",
  });

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
