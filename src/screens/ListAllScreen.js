import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import CatagoryItem from "../components/CatagoryItem";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL, endpoints } from "../config";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AntDesign } from '@expo/vector-icons';

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
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectToday, setSelectToday] = useState(false);
  const [monthColor, setMonthColor] = useState('#fff');
  const [todayColor, setTodayColor] = useState('#fff');

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

  function ListAll(){
    axios
    .get(`${endpoints.bill}`)
    .then((response) => {
      setListAll(response.data.reverse());
    })
    .catch((error) => {
      console.log(`Get List: ${error}`);
    });
  }

  function ListToday(){
    axios
    .get(`${endpoints.search}`, {params: {item: "date", keyword:"today"}})
    .then((response) => {
      setListAll(response.data.reverse());
    })
    .catch((error) => {
      console.log(`Get List: ${error}`);
    });
  }

  function ListMonth(){
    axios
    .get(`${endpoints.search}`, {params: {item: "date", keyword:"month"}})
    .then((response) => {
      setListAll(response.data.reverse());
    })
    .catch((error) => {
      console.log(`Get List: ${error}`);
    });
  }

  const searchToday = () =>{
    if(selectToday){
      setSelectToday(false);
      setTodayColor('#fff');
      ListAll();
    }
    else{
      setSelectToday(true);
      setTodayColor('#ddd');
      setMonthColor('#fff');
      setSelectMonth(false);
      ListToday();
    }
  }

  const searchMonthly = () =>{
    if(selectMonth){
      setSelectMonth(false);
      setMonthColor('#fff');
      ListAll();
    }
    else{
      setSelectMonth(true);
      setMonthColor('#ddd');
      setTodayColor('#fff');
      setSelectToday(false);
      ListMonth();
    }
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
    ListAll();
  }, []);

  useEffect(() => {
    axios
    .get(`${endpoints.search}`, {params: {item: "categories", keyword: "1"}} )
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(`Get sum: ${error}`);
    });
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filterIcon}>
          <AntDesign name="filter" size={24} color="black" />
        </View>
        <TouchableOpacity style={[styles.emptyButton, {backgroundColor: todayColor}]} onPress = {searchToday}>
          <Text>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.emptyButton, {backgroundColor: monthColor}]} onPress = {searchMonthly}>
          <Text>Month</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterIcon: {
    marginRight: 10,
    marginLeft: 20,
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