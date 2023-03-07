import React, { useEffect, useState, useContext, Component } from "react";
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
  KeyboardAvoidingView
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import Modal from "react-native-modal";
import { Card, Icon } from '@rneui/themed';
import { ListItem, Avatar } from "@rneui/base";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';


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

import {CategorySelectionIncome} from './CategorySelectIncome.js'
import {MoneyInput} from './MoneyInput.js'

// get the screen height
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Stack = createStackNavigator();

// list of categories
// const categories = ['Food', 'Shopping', 'Accommodation', 'Transportation', 'Entertainment'];

//// content for Income interface
export function Income({ navigation }) {
  const [text, setText] = useState('');

  // for category modal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => { setModalVisible(true); };
  const closeModal = () => { setModalVisible(false); };
  
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
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  console.log(selectedCategoryName);
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
        {MoneyInput()}
        
      <TouchableOpacity onPress={openModal}>
        <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
            <View style={styles.modal}>

            <TouchableOpacity onPress={closeModal} style={styles.button}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            {CategorySelectionIncome(setSelectedCategoryName)}
            </View>
        </Modal>
        <ListItem bottomDivider>
            <Entypo name="box" size={24} color="#B2B2B2" />
            <ListItem.Content>
                <ListItem.Title>Category: {selectedCategoryName}</ListItem.Title>
                
            </ListItem.Content>
            <ListItem.Chevron />
            </ListItem>
        </TouchableOpacity>

        <ListItem bottomDivider>
          <Entypo name="wallet" size={24} color="#B2B2B2" />
          <ListItem.Content>
            <ListItem.Title>To:</ListItem.Title>
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
        {/* -------------save button--------------- */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.saveButton}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  

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
    content: {
      margin: 3
    },
    input: {
      height: 40,
      margin: -5,
      borderWidth: 0,
      padding: 5,
    },
    saveButton: {
      alignSelf: 'center',
      backgroundColor: '#A04AAA',
      width: 370,
      alignItems: 'center',
      borderRadius: 50,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 40,
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
    modal: {
        flex: 0.7,
        margin: 0,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
  });