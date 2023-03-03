import React, { useEffect, useState, useContext, Component} from "react";
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


import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';


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
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateConfirm = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    setIsDatePickerVisible(false);
  };
  const handleDateCancel = () => {
    setIsDatePickerVisible(false);
  };


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
      
      <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
        <ListItem bottomDivider>
          <Entypo name="calendar" size={24} color="#B2B2B2" />
              <ListItem.Content>
              <ListItem.Title>Date: {selectedDate}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
      {/* {selectedDate && (
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate}
        </Text>
      )} */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />

      </View> 
    </KeyboardAvoidingView>

    
  );
};

//// content for income screen
const Income = () => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateConfirm = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    setIsDatePickerVisible(false);
  };

  const handleDateCancel = () => {
    setIsDatePickerVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsDatePickerVisible(true)}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>
      {selectedDate && (
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate}
        </Text>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
    </View>
  );
};


//// content for transfer screen
function Transfer() {
  return(
    <View>
      <Text>transfer</Text>
    </View>
  )
};

const Tab = createMaterialTopTabNavigator();

export default function AddNewTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Expense" component={Expense} />
      <Tab.Screen name="Income" component={Income} />
      <Tab.Screen name="Transfer" component={Transfer} />
    </Tab.Navigator>
  );
};


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

  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedDateText: {
    marginVertical: 10,
  },

});