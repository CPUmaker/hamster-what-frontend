import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

import BarChartHelper from "../../components/BarChartHelper";
import style from "react-native-common-date-picker/src/datePicker/style";

export default function BarChartScreen() {
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chart}>
        <Text style={styles.title}>Bar Chart</Text>
        <BarChartHelper data={barData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
  },
  chart: {
    alignItems: "center",
    marginLeft: 50,
    marginVertical: 8,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },
});
