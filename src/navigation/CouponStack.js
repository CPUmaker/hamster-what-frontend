import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CouponListScreen from "../screens/CouponScreens/CouponListScreen";
import CouponDetailsScreen from "../screens/CouponScreens/CouponDetails";

const Stack = createNativeStackNavigator();

export default function CouponStack() {
  return (
    <Stack.Navigator
      initialRouteName="CouponList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CouponList" component={CouponListScreen} />
      <Stack.Screen name="CouponDetails" component={CouponDetailsScreen} />
    </Stack.Navigator>
  );
}
