import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from '../screens/SettingsScreen';
import ApperaranceScreen from '../screens/Settings/ApperaranceScreen';
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function SettingStack(){  
    return (
        <Stack.Navigator>
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="ApperaranceScreen" component={ApperaranceScreen} />
        </Stack.Navigator>
      );
}

