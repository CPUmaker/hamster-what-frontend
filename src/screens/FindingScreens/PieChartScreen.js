import React, { useEffect, useState, useContext } from "react";
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

import PieChartHelper from "../../components/PieChartHelper";
import { AnimatedText } from "../../components/AnimatedText";
import { endpoints } from "../../config";
import { categories_map, getKeyByValue } from "../AddNewScreen/utils";
import categoryIcons from "../../components/CategoryIcons";
import PaymentSwitch from "../../components/PaymentSwitch";
import ListItem from "../../components/ListItem";
import { ThemeContext } from "../../context/ThemeContext";

const defaultPieData = [
  { x: "Liquid", y: 100 },
  { x: "Iced", y: 12 },
  { x: "Total", y: 55 },
];

const TransDirection = {
  Expense: "Expense",
  Income: "Income",
};

export default function PieChartScreen() {
  const [transDir, setTransDir] = useState(TransDirection.Expense);
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(
    new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)
  );
  const [numBills, setNumBills] = useState(2);
  const [pieData, setPieData] = useState(defaultPieData);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const { isDarkModeEnabled } = useContext(ThemeContext);

  const onSelectSwitch = (value) => {
    setTransDir(value);
  };

  useEffect(() => {
    setYear(date.getFullYear());
    setMonth(new Intl.DateTimeFormat("en-US", { month: "long" }).format(date));
    // setNumBills(Math.floor(Math.random() * 20));
  }, [date]);

  const loadFilteredData = () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    axios
      .get(endpoints.search, {
        params: {
          item: "date",
          keyword: "month",
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
        const categoriesSum = new Array(
          Object.keys(categories_map).length
        ).fill(0);
        data.forEach((item) => {
          if (transDir === TransDirection.Expense) {
            categoriesSum[item.categories - 1] += -parseFloat(item.price);
          } else {
            categoriesSum[item.categories - 1] += parseFloat(item.price);
          }
        });

        // update transaction number
        setNumBills(data.length);

        // process pieData
        let pieData = categoriesSum.map((item, index) => ({
          x: getKeyByValue(categories_map, index + 1),
          y: item,
          fill: categoryIcons.find((c) => c.id === index + 1).color,
        }));
        if (transDir === TransDirection.Expense) {
          setExpenseData(pieData);
        } else {
          setIncomeData(pieData);
        }
        pieData = pieData.filter((item) => item.y !== 0);
        pieData =
          pieData.length === 0
            ? [{ x: "No Bill", y: 100, fill: "grey" }]
            : pieData;
        setPieData(pieData);
        console.log(JSON.stringify(pieData));
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
    <ScrollView
      style={isDarkModeEnabled ? styles.dark_container : styles.light_container}
    >
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
  light_container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dark_container: {
    flex: 1,
    backgroundColor: "#242c40",
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
