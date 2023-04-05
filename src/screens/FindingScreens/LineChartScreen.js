import React from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import LineChartHelper from "../../components/LineChartHelper";

export default function LineChartScreen() {
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrow} onPress={() => {}}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <View style={{alignItems: "center"}}>
          <Text style={styles.header_text_up}>April 2023</Text>
          <Text style={styles.header_text_down}>2 TRANSACTIONS</Text>
        </View>
        <TouchableOpacity style={styles.arrow} onPress={() => {}}>
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <LineChartHelper data={lineData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    borderRadius: 30,
    marginHorizontal: 25,
    marginVertical: 30,
    backgroundColor: "#002FA7",
  },
  header_text_up: {
    color: "powderblue",
    fontFamily: "Roboto-Medium",
    fontSize: 24,
  },
  header_text_down: {
    color: "powderblue",
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },
  arrow: {
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },
});
