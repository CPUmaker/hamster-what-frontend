import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  graphStyle: {
    marginVertical: 20,
    marginHorizontal: 0,
    borderRadius: 16,
  },
});

const BarChartHelper = ({ data }) => (
  <BarChart
    style={styles.graphStyle}
    data={data}
    width={Dimensions.get("window").width * 1}
    height={350}
    yAxisLabel="$"
    chartConfig={chartConfig}
    verticalLabelRotation={90}
    fromZero={true}
  />
);

export default BarChartHelper;
