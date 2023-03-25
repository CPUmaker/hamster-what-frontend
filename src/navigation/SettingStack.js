import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screens/SettingsScreen";
import ApperaranceScreen from "../screens/Settings/ApperaranceScreen";
import { ContactUsScreen } from "../screens/Settings/ContactUs";
import { useEffect } from "react";
import { TermsAndConditionsScreen } from "../screens/Settings/TermsConditions";
import { PrivacyPolicyScreen } from "../screens/Settings/PrivacyPolicy";
import { NotificationSettingsScreen } from "../screens/Settings/Notification";
import {
  PasswordSettingScreen,
  PasswordSettingWrapper,
} from "../screens/Settings/PasswordSetting";

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ApperaranceScreen" component={ApperaranceScreen} />
      <Stack.Screen
        name="Notification"
        component={NotificationSettingsScreen}
      />

      <Stack.Screen name="Password" component={PasswordSettingScreen} />

      <Stack.Screen name="Contact Us" component={ContactUsScreen} />
      <Stack.Screen
        name="Terms & Conditions"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
}
