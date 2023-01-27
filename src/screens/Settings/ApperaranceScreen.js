import React,  { useState }from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Card, Icon, ListItem} from '@rneui/themed';

import { MaterialCommunityIcons, 
         MaterialIcons,
         Octicons,
         Entypo,
         AntDesign,} from '@expo/vector-icons';

export default function Apperarance({ navigation }) {
    
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={{ padding: 20 }}>

            <View>
            <Text style={styles.settings_title}>Apperarance</Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ListItem containerStyle={styles.container_item}>
                <MaterialCommunityIcons name="account" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title>Profile</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </TouchableOpacity>

            </View>
           

        </ScrollView>
        </SafeAreaView>


    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    settings_title:{
        fontSize: 18,
        fontFamily: "Roboto-Medium",
    },
    container_item: {
        flex: 1,
        paddingLeft: 0,
        paddingRight: 0,
    },
    profile_container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    profile_img: {
      width: 35,
      height: 35,
    },
    profile_font: {
      fontSize: 18,
      fontFamily: "Roboto-Medium",
    },
    search_container: {
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#C6C6C6",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    bank_container: {
      marginVertical: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bank_title: {
      fontSize: 18,
      fontFamily: "Roboto-Medium",
    },
  });