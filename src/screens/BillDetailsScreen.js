import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, PanResponder } from "react-native";
import CatagoryItem from "../components/CatagoryItem";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL, endpoints } from "../config";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ThemeContext } from "../context/ThemeContext";

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
export default function BillDetaisScreen({ navigation, route }) {

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx > 0 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > 200) {
          navigation.goBack();
        }
      },
    })
  ).current;

  useEffect(() => {
    navigation.getParent().setOptions({swipeEnabled: false});
  }, [])

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      navigation.getParent().setOptions({swipeEnabled: true});
    })
  }, [navigation]);

  const { isDarkModeEnabled } = useContext(ThemeContext);
  const [listAll, setListAll] = useState(null);

  const deleteItem = (id) => {
    axios
      .delete(`${id}`)
      .then(() => {
        const newList = listAll.filter(item => item.url !== id);
        setListAll(newList);
      })
      .catch((error) => {
        console.log(`Delete Item: ${error}`);
      });
  };

  function ListAll(callback) {
    axios
      .get(`${endpoints.bill}`)
      .then((response) => {
        const newListAll = response.data.reverse();
        callback(newListAll);
      })
      .catch((error) => {
        console.log(`Get List: ${error}`);
      });
  }

  function filterList(list, category, filterType) {
    const categoryKey = ItemCategory.indexOf(category) + 1;
    let filteredList = [];
  
    if (filterType === "Monthly") {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 30);
      filteredList = list.filter((item) => {
        const itemDate = new Date(item.date);
        const itemCategory = item.categories;
        return itemDate >= currentDate && itemCategory === categoryKey;
      });
    } else if (filterType === "Today") {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() - 24);
      filteredList = list.filter((item) => {
        const itemDate = new Date(item.date);
        const itemCategory = item.categories;
        return itemDate >= currentDate && itemCategory === categoryKey;
      });
    }
    return filteredList;
  }

  const renderLeftActions = () => (
    <TouchableOpacity style={[styles.button, styles.leftButton]}>
      <Text style={styles.money_text}>Details</Text>
    </TouchableOpacity>
  );
  
  const renderRightActions = (id) => (
    <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={() => deleteItem(id)}>
      <Text style={styles.money_text}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderLeftActions={renderLeftActions} renderRightActions={() => renderRightActions(item.url)}>
      <CatagoryItem
        name={ItemCategory[item.categories-1]}
        money={item.price}
        date={item.date}
      />
    </Swipeable>
  );

  useEffect(() => {
    ListAll((newListAll) => {
      const filteredListAll = filterList(newListAll, route.params.title, route.params.id);
      setListAll(filteredListAll);
    });
  }, []);

  return (
    <SafeAreaView style={isDarkModeEnabled ? styles.dark_container : styles.light_container} {...panResponder.panHandlers}>
      <FlatList
        data={listAll}
        renderItem={renderItem}
        keyExtractor={(item) => item.url.toString()}
        contentContainerStyle={{ padding: 20 }}
        extraData={listAll}
      />
    </SafeAreaView>
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
  button: {
    padding: 10,
    width: 100,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyButton:{
    margin: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#888',
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  leftButton: {
    backgroundColor: '#4CAF50',
  },
  rightButton: {
    backgroundColor: '#f44336',
  },
  money_text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 14,
  },
});