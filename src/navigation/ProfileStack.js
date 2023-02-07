import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import SetProfileScreen from "../screens/ProfileSettingScreen/SetProfileScreen"

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" Profile " component={ProfileScreen} options={({ route }) => ({ title: route.params?.title })}/>
      <Stack.Screen name="Set" component={SetProfileScreen} />
    </Stack.Navigator>
  );
}
