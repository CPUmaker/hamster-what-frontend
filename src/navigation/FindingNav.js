import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import LineChartScreen from "../screens/FindingScreens/LineChartScreen";
import BarChartScreen from "../screens/FindingScreens/BarChartScreen";
import PieChartScreen from "../screens/FindingScreens/PieChartScreen";

const Tab = createMaterialTopTabNavigator();

export default function FindingNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LineChart" component={LineChartScreen} />
      <Tab.Screen name="BarChart" component={BarChartScreen} />
      <Tab.Screen name="PieChart" component={PieChartScreen} />
    </Tab.Navigator>
  );
}
