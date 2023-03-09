import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from '../screens/SettingsScreen';
import ApperaranceScreen from '../screens/Settings/ApperaranceScreen';
import { FaceID_TouchID } from '../screens/Settings/FaceID_TouchID.js';
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function SettingStack(){  
    return (
        <Stack.Navigator>
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="ApperaranceScreen" component={ApperaranceScreen} />
          <Stack.Screen name="FaceID_TouchID" component={FaceID_TouchID} />
        </Stack.Navigator>
      );
}

