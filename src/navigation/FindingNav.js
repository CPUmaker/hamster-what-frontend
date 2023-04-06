import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import LineChartScreen from "../screens/FindingScreens/LineChartScreen";
import PieChartScreen from "../screens/FindingScreens/PieChartScreen";

const Tab = createMaterialTopTabNavigator();

export default function FindingNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LineChart" component={LineChartScreen} options={{title: "TRENDS"}} />
      <Tab.Screen name="PieChart" component={PieChartScreen} options={{title: "CATEGORIES"}} />
    </Tab.Navigator>
  );
}
