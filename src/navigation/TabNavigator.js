import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import FindingScreen from "../screens/FindingScreen";
import BillDetailsScreen from "../screens/BillDetailsScreen";
import AddNew from "../screens/AddNew";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
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
        name="AddButton"
        component={AddNew}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={50} color="black" />
          ),

        }}
      />
      <Tab.Screen
        name="Finding"
        component={FindingScreen}
        options={{
          tabBarBadge: 2,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
