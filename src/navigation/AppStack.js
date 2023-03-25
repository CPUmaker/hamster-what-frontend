import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext, useState, useEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";

import ProfileStack from "./ProfileStack";
import CustomDrawer from "../components/CustomDrawer";
import TabNavigator from "./TabNavigator";
import SettingStack from "./SettingStack";
import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

export default function AppStack() {
  const [bioAuthPassed, setBioAuthPassed] = useState(false);
  const { bioAuth, isUsingBioAuth } = useContext(AuthContext);

  useEffect(() => {
    if (isUsingBioAuth) {
      bioAuth()
        .then(() => {
          setBioAuthPassed(true);
        })
        .catch((err) => {
          setBioAuthPassed(false);
          alert(err);
        });
    } else {
      setBioAuthPassed(true);
    }
  }, []);

  if (isUsingBioAuth && !bioAuthPassed) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Roboto-Medium",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
