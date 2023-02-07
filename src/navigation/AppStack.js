import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import SettingsScreen from "../screens/SettingsScreen";
import CustomDrawer from "../components/CustomDrawer";
import TabNavigator from "./TabNavigator";
import ProfileStack from "./ProfileStack";

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { marginLeft: -25, fontFamily: "Roboto-Medium", fontSize: 15 },
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
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
