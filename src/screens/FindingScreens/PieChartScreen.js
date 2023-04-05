import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import PieChartHelper from "../../components/PieChartHelper";
import { AnimatedText } from "../../components/AnimatedText";

export default function PieChartScreen() {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(
    new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)
  );
  const [numBills, setNumBills] = useState(2);

  useEffect(() => {
    setYear(date.getFullYear());
    setMonth(new Intl.DateTimeFormat("en-US", { month: "long" }).format(date));
    setNumBills(Math.floor(Math.random() * 20));
  }, [date]);

  const pieData = [
    { x: "Liquid", y: Math.floor(Math.random() * 100) },
    { x: "Iced", y: Math.floor(Math.random() * 100) },
    { x: "Total", y: Math.floor(Math.random() * 100) },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            setDate(new Date(date.setMonth(date.getMonth() - 1)));
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <AnimatedText
            style={styles.header_text_up}
            text={`${month} ${year}`}
          />
          <AnimatedText
            style={styles.header_text_down}
            text={`${numBills} TRANSACTIONS`}
          />
        </View>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            setDate(new Date(date.setMonth(date.getMonth() + 1)));
          }}
        >
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <PieChartHelper data={pieData} />
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
