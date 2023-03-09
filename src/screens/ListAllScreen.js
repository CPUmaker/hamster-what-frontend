import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text} from "react-native";

import CatagoryItem from "../components/CatagoryItem";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL, endpoints } from "../config";

const ItemCategory = ["Food", "Groceries", "Transportation", "clothing", "Entertainment", 
                    "Bill", "Sports", "Electronics", "Travel", "House & Car", "Others"]

export default function ListAllScreen({ navigation }) {
  useEffect(() => {
    navigation.getParent().setOptions({swipeEnabled: false});
  }, [])
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      navigation.getParent().setOptions({swipeEnabled: true});
    })
  }, [navigation]);

  let [listAll, setListAll] = useState(null);

  let showItems;
  if(listAll){
    showItems = listAll.map((l) =>
    <CatagoryItem
      key = {listAll.indexOf(l)}
      name={ItemCategory[l.categories-1]}
      money={l.price}
      date={l.date}
    >
    </CatagoryItem>
    )
  }else{
    showItems = <Text>loading...</Text>
  }
  
  const readAllItems = async()=>{
    await axios
      .get(endpoints.bill)
      .then((res) => {
        let data = res.data;
        setListAll(data);
        listAll = data;
        //console.log(data);
      })
      .catch((error) => {
        console.log(`Get List: ${error}`)
      })
  }

  useEffect(() => {
    if(listAll == null){
     readAllItems();
    }
    setListAll(listAll);
  })
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
      <View>
        {showItems}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#fff',
    alignItems: "center",
    margin: 4,
  },
  item_container: {
    flexDirection: "row",
    alignContent: "center",
    flex: 1,
  },
  detail_text: {
    color: "#333",
    fontFamily: "Roboto-Medium",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#0aada8",
    padding: 10,
    width: 100,
    borderRadius: 10,
  },
  money_text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 14,
  },
});

