import React, { useContext, useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";

export default function AppNav() {
  const [isReading, setIsReading] = useState(true);
  const { isLoading, userToken } = useContext(AuthContext);
  const { readProfile, userProfile } = useContext(ProfileContext);

  useEffect(() => {
    if (userToken !== null) {
      readProfile();
    }
  }, [userToken]);

  useEffect(() => {
    setIsReading(userProfile === null);
  }, [userProfile]);

  if (isLoading || (isReading && userToken !== null)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  // if (userToken !== null) {
  //   readProfile();
  // }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
