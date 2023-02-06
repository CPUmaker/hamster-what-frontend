import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import * as AppleAuthentication from 'expo-apple-authentication';
import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

// const toast = useToast();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (username, password, errorHandle) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/login`, { username, password })
      .then((res) => {
        let data = res.data;
        setUserInfo(data.user);
        setUserToken(data.token);

        axios.defaults.headers.common['Authorization'] = `Token ${data.token}`;
        AsyncStorage.setItem("userInfo", JSON.stringify(data.user));
        AsyncStorage.setItem("userToken", data.token);

        console.log(data.user);
        console.log('User Token: ' + data.token);
      })
      .catch((error) => {
        console.log(`Login error: ${JSON.stringify(error.response.data)}`);
        errorHandle(Object.values(error.response.data).pop()[0]);
      });
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);

    axios.post(`${BASE_URL}/api/auth/logout`)
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

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
