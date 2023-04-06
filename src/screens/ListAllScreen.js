import React, { useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CatagoryItem from "../components/CatagoryItem";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL, endpoints } from "../config";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";

const ItemCategory = [
  "Food",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Housing",
  "Utilities",
  "Other",
  "Salary",
  "Interest",
  "Investment",
  "Child benefit",
  "Pension",
  "Income"
];

export default function ListAllScreen({ navigation }) {
  useEffect(() => {
    navigation.getParent().setOptions({ swipeEnabled: false });
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      navigation.getParent().setOptions({ swipeEnabled: true });
    });
  }, [navigation]);

  const [listAll, setListAll] = useState(null);
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectToday, setSelectToday] = useState(false);
  const [selectAll, setSelectAll] = useState(true);
  const [monthColor, setMonthColor] = useState("#fff");
  const [todayColor, setTodayColor] = useState("#fff");
  const [allColor, setAllColor] = useState("#ddd");

  const retrieveItem = (id) => {
    axios
      .get(`${id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (parseFloat(data.price) >= 0) {
          navigation.navigate("AddNew", {
            screen: "Income",
            params: {
              categories: data.categories,
              comment: data.comment,
              date: data.date,
              price: data.price,
              wallet: data.wallet,
            },
          });
        } else {
          navigation.navigate("AddNew", {
            screen: "Expense",
            params: {
              categories: data.categories,
              comment: data.comment,
              date: data.date,
              price: data.price,
              wallet: data.wallet,
            },
          });
        }
      })
      .catch((error) => {
        console.log(`RetrieveItem: ${error}`);
      });
  };

  const deleteItem = (id) => {
    axios
      .delete(`${id}`)
      .then(() => {
        const newList = listAll.filter((item) => item.url !== id);
        setListAll(newList);
      })
      .catch((error) => {
        console.log(`Delete Item: ${error}`);
      });
  };

  function ListAll() {
    axios
      .get(`${endpoints.bill}`)
      .then((response) => {
        setListAll(response.data.reverse());
      })
      .catch((error) => {
        console.log(`Get List: ${error}`);
      });
  }

  function ListToday() {
    axios
      .get(`${endpoints.search}`, {
        params: { item: "date", keyword: "today" },
      })
      .then((response) => {
        setListAll(response.data.reverse());
      })
      .catch((error) => {
        console.log(`ListToday: ${error}`);
      });
  }

  function ListMonth() {
    axios
      .get(`${endpoints.search}`, {
        params: { item: "date", keyword: "month" },
      })
      .then((response) => {
        setListAll(response.data.reverse());
      })
      .catch((error) => {
        console.log(`ListMonth: ${error}`);
      });
  }

  const resetFilters = () => {
    setSelectAll(false);
    setAllColor("#fff");
    setSelectToday(false);
    setTodayColor("#fff");
    setSelectMonth(false);
    setMonthColor("#fff");
  };

  const searchAll = () => {
    if (selectAll) { return; }
    resetFilters();
    setSelectAll(true);
    setAllColor("#ddd");
    ListAll();
  };

  const searchToday = () => {
    if (selectToday) { return; }
    resetFilters();
    setSelectToday(true);
    setTodayColor("#ddd");
    ListToday();
  };

  const searchMonthly = () => {
    if (selectMonth) { return; }
    resetFilters();
    setSelectMonth(true);
    setMonthColor("#ddd");
    ListMonth();
  };

  const renderLeftActions = (id) => (
    <TouchableOpacity
      style={[styles.button, styles.leftButton]}
      onPress={() => retrieveItem(id)}
    >
      <Text style={styles.money_text}>Details</Text>
    </TouchableOpacity>
  );

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={[styles.button, styles.rightButton]}
      onPress={() => deleteItem(id)}
    >
      <Text style={styles.money_text}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderLeftActions={() => renderLeftActions(item.url)}
      renderRightActions={() => renderRightActions(item.url)}
    >
      <CatagoryItem
        name={ItemCategory[item.categories - 1]}
        money={item.price}
        date={item.date}
      />
    </Swipeable>
  );

  useEffect(() => {
    ListAll();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonGroups}>
        <TouchableOpacity
          style={[styles.emptyButton, { backgroundColor: allColor }]}
          onPress={searchAll}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.emptyButton, { backgroundColor: todayColor }]}
          onPress={searchToday}
        >
          <Text>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.emptyButton, { backgroundColor: monthColor }]}
          onPress={searchMonthly}
        >
          <Text>This Month</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listAll}
        renderItem={renderItem}
        keyExtractor={(item) => item.url.toString()}
        contentContainerStyle={{ padding: 20 }}
        extraData={listAll} // add extraData to force re-render when listAll changes
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonGroups: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
  button: {
    padding: 10,
    width: 100,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyButton: {
    flex: 1,
    margin: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#888",
    height: 30,
    //width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  leftButton: {
    backgroundColor: "#4CAF50",
  },
  rightButton: {
    backgroundColor: "#f44336",
  },
  money_text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 14,
  },
});
