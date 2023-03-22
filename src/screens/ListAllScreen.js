import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import CatagoryItem from "../components/CatagoryItem";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL, endpoints } from "../config";
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ItemCategory = ["Food", "Groceries", "Transportation", "clothing", "Entertainment", "Bill", "Sports", "Electronics", "Travel", "House & Car", "Others"];

export default function ListAllScreen({ navigation }) {
  useEffect(() => {
    navigation.getParent().setOptions({swipeEnabled: false});
  }, [])

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      navigation.getParent().setOptions({swipeEnabled: true});
    })
  }, [navigation]);

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
    axios
      .get(`${endpoints.bill}`)
      .then((response) => {
        setListAll(response.data.reverse());
      })
      .catch((error) => {
        console.log(`Get List: ${error}`);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    width: 100,
    margin: 10,
    borderRadius: 10,
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