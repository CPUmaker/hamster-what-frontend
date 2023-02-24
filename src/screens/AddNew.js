import React, { useEffect, useState, useContext} from "react";
import { 
  StyleSheet, 
  Button, 
  View, 
  SafeAreaView, 
  Text, 
  Alert, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Dimensions,
  TextInput,
  Keyboard,
  KeyboardAvoidingView } from "react-native";

import Modal from "react-native-modal";
import { Card, Icon } from '@rneui/themed';
import { ListItem, Avatar} from "@rneui/base";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// only needs to keep one datepicker
// import DatePicker from 'react-native-date-picker'
import {DatePicker} from "react-native-common-date-picker";

import { AuthContext } from "../context/AuthContext";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Octicons,
  Entypo,
  Foundation,
  AntDesign,
  FontAwesome5,
} from '@expo/vector-icons';

// get the screen height
const SCREEN_HEIGHT = Dimensions.get('window').height;

//// content for Expense interface
function Expense({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

  // variable for date picker
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  // fix the issues when swipe to the right will bring out sidebar
  useEffect(() => {
    navigation.getParent().setOptions({ swipeEnabled: false });
  }, [])

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      navigation.getParent().setOptions({ swipeEnabled: true });
    })
  }, [navigation])
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={styles.container}>
      <ListItem bottomDivider>
      <Entypo name="box" size={24} color="#B2B2B2" />
          <ListItem.Content>
          <ListItem.Title>Category:</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
      </ListItem>

      <ListItem bottomDivider>
      <Entypo name="wallet" size={24} color="#B2B2B2" />
          <ListItem.Content>
          <ListItem.Title>From:</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
      </ListItem>

      <ListItem bottomDivider>
      <FontAwesome5 name="sticky-note" size={24} color="#B2B2B2" />
          <ListItem.Content>
          <ListItem.Title>Note: </ListItem.Title>
          <TextInput
            style={styles.input}
            placeholder="Type here to write down your note "
            onChangeText={newText => setText(newText)}
            defaultValue={text}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
          />
          </ListItem.Content>
          <ListItem.Chevron />
      </ListItem>
      
      <TouchableOpacity>
      <ListItem bottomDivider>
      <Entypo name="calendar" size={24} color="#B2B2B2" />
          <ListItem.Content>
          <ListItem.Title>Date</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
      </ListItem>
      </TouchableOpacity>

      </View> 
    </KeyboardAvoidingView>

    
  );
}

//// content for income screen
function Income() {
  // variable for date picker
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  
  return(
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

function Transfer() {
  return(
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Transfer</Text>
  </View>
  )
}

const Tab = createMaterialTopTabNavigator();

export default function AddNewTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Expense" component={Expense} />
      <Tab.Screen name="Income" component={Income} />
      <Tab.Screen name="Transfer" component={Transfer} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  content:{
      margin:3
  },
  input: {
    height: 40,
    margin: -5,
    borderWidth: 0,
    padding: 5,
  },

});