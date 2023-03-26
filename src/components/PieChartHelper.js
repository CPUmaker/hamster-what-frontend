import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  graphStyle: {
    marginVertical: 8,
  },
});

const PieChartHelper = ({ data }) => (
  <PieChart
    style={styles.graphStyle}
    data={data}
    width={Dimensions.get("window").width}
    height={300}
    chartConfig={chartConfig}
    accessor={"population"}
    backgroundColor={"transparent"}
    paddingLeft={"20"}
    hasLegend={true}
  />
);

export default PieChartHelper;
