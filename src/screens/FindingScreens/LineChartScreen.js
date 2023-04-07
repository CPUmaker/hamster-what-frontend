import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

import LineChartHelper from "../../components/LineChartHelper";
import { AnimatedText } from "../../components/AnimatedText";
import { endpoints } from "../../config";
import { categories_map, getKeyByValue } from "../AddNewScreen/utils";
import PaymentSwitch from "../../components/PaymentSwitch";
import ListItem from "../../components/ListItem";

const lineData = [
  { x: "Jan", y: Math.random() * 200 },
  { x: "Feb", y: Math.random() * 200 },
  { x: "Mar", y: Math.random() * 200 },
  { x: "Apr", y: Math.random() * 200 },
  { x: "May", y: Math.random() * 200 },
  { x: "Jun", y: Math.random() * 200 },
  { x: "Jul", y: Math.random() * 200 },
  { x: "Aug", y: Math.random() * 200 },
  { x: "Sep", y: Math.random() * 200 },
  { x: "Oct", y: Math.random() * 200 },
  { x: "Nov", y: Math.random() * 200 },
  { x: "Dec", y: Math.random() * 200 },
];

const Months = [
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
];

const TransDirection = {
  Expense: "Expense",
  Income: "Income",
};

export default function LineChartScreen() {
  const [transDir, setTransDir] = useState(TransDirection.Expense);
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [numBills, setNumBills] = useState(3);
  const [getLineData, setLineData] = useState(lineData);

  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  const onSelectSwitch = (value) => {
    setTransDir(value);
  };

  useEffect(() => {
    setYear(date.getFullYear());
  }, [date]);

  const loadFilteredData = () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    axios
      .get(endpoints.search, {
        params: {
          item: "date",
          keyword: "year",
          date: `${year}-${month}-${day}`,
        },
      })
      .then((res) => {
        // preprocess response.data
        const data = res.data.filter((item) => {
          if (transDir === TransDirection.Expense) {
            return parseFloat(item.price) < 0;
          } else {
            return parseFloat(item.price) > 0;
          }
        });
        const monthSum = new Array(12).fill(0);
        data.forEach((item) => {
          const date = new Date(item.date);
          if (transDir === TransDirection.Expense) {
            monthSum[date.getMonth()] += -parseFloat(item.price);
          } else {
            monthSum[date.getMonth()] += parseFloat(item.price);
          }
        });

        // update transaction number
        setNumBills(data.length);

        // process pieData
        let lineData = monthSum.map((item, index) => ({
          x: Months[index],
          y: item,
        }));
        setLineData(lineData);
        console.log(JSON.stringify(lineData));
      })
      .catch((error) => console.log(`loadFilteredData: ${error}`));
  };

  useEffect(() => {
    loadFilteredData();
  }, [date, transDir]);

  const renderItem = ({ item }) => {
    return (
      <ListItem
        key={item.x}
        name={item.x}
        money={item.y}
        onPressCallback={() => {}}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            setDate(new Date(date.setFullYear(date.getFullYear() - 1)));
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <AnimatedText style={styles.header_text_up} text={`${year}`} />
          <AnimatedText
            style={styles.header_text_down}
            text={`${numBills} TRANSACTIONS`}
          />
        </View>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => {
            setDate(new Date(date.setFullYear(date.getFullYear() + 1)));
          }}
        >
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.graph}>
        <LineChartHelper data={getLineData} />
      </View>

      <View style={styles.PaymentSwitch}>
        <PaymentSwitch
          selectionMode={TransDirection.Expense}
          option1={TransDirection.Expense}
          option2={TransDirection.Income}
          onSelectSwitch={onSelectSwitch}
        />
      </View>

      <View style={styles.PaymentSwitch}>
        {transDir === TransDirection.Expense && (
          <FlatList
            data={expenseData}
            renderItem={renderItem}
            keyExtractor={(item) => item.x + "expense"}
            extraData={expenseData}
            scrollEnabled={false}
          />
        )}
        {transDir === TransDirection.Income && (
          <FlatList
            data={incomeData}
            renderItem={renderItem}
            keyExtractor={(item) => item.x + "income"}
            extraData={incomeData}
            scrollEnabled={false}
          />
        )}
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
    marginTop: 30,

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
  graph: {
    marginLeft: 50,
    marginRight: 20,
    alignItems: "center",
  },
  PaymentSwitch: {
    marginLeft: 20,
    marginRight: 20,
  },
});
