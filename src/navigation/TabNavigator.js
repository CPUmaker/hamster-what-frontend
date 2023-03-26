import React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import BillDetailsScreen from "../screens/BillDetailsScreen";
import ListAllScreen from "../screens/ListAllScreen";
import AddNew from "../screens/AddNew";
import CouponStack from "./CouponStack";
import FindingNav from "./FindingNav";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      cardStyle={{ backgroundColor: "transparent" }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BillDetails"
        component={BillDetailsScreen}
        options={({ route }) => ({ title: route.params?.title })}
      />
      <Stack.Screen
        name="SeeAll"
        component={ListAllScreen}
        options={() => ({ title: "See All" })}
      />
      <Stack.Screen
        name={`AddNew`}
        component={AddNew}
        options={{
          cardStyle: {
            backgroundColor: "transparent",
          },
          presentation: "modal",
          gestureResponseDistance: SCREEN_HEIGHT * 0.9,
          gestureVelocityImpact: 0.5, // default 0.3,
        }}
      />
    </Stack.Navigator>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Tab.Screen
        name="MainPage"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Finding"
        component={FindingNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Coupon"
        component={CouponStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
