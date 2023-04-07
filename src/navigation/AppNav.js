import React, { useContext, useState, useEffect } from "react";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import { ThemeContext } from "../context/ThemeContext";

export default function AppNav({ mainViewRef }) {
  const [isReading, setIsReading] = useState(true);
  const { isLoading, userToken } = useContext(AuthContext);
  const { readProfile, userProfile } = useContext(ProfileContext);
  const { isDarkModeEnabled } = useContext(ThemeContext);

  useEffect(() => {
    if (userToken !== null) {
      readProfile();
    }
  }, [userToken]);

  useEffect(() => {
    setIsReading(userProfile === null);
  }, [userProfile]);

  useEffect(() => {
    mainViewRef.current.setNativeProps({
      style: {
        backgroundColor: isDarkModeEnabled ? "#121212" : "white",
      },
    });
  }, [isDarkModeEnabled]);

  if (isLoading || (isReading && userToken !== null)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDarkModeEnabled ? "#242c40" : "white",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  // if (userToken !== null) {
  //   readProfile();
  // }

  return (
    <NavigationContainer theme={isDarkModeEnabled ? DarkTheme : DefaultTheme}>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
