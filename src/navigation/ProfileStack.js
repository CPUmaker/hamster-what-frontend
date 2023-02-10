import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import SetProfileScreen from "../screens/ProfileSettingScreen/SetProfileScreen"
import SetUsername from "../screens/ProfileSettingScreen/SetUsername"
import SetEmail from "../screens/ProfileSettingScreen/SetEmail"
import SetBio from "../screens/ProfileSettingScreen/SetBio";
import SetAffiliation from "../screens/ProfileSettingScreen/SetAffiliation";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" Profile " component={ProfileScreen} options={({ route }) => ({ title: route.params?.title })}/>
      <Stack.Screen name="Set" component={SetProfileScreen} />
      <Stack.Screen name="User Name" component={SetUsername} />
      <Stack.Screen name="Email" component={SetEmail} />
      <Stack.Screen name="Bio" component={SetBio} />
      <Stack.Screen name="Affiliation" component={SetAffiliation} />
    </Stack.Navigator>
  );
}
