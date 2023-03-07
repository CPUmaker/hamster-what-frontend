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

import Modal from "react-native-modal";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import different screen
import { Expense } from './AddNewScreen/AddNewExpense.js'
import { Income } from './AddNewScreen/AddNewIncome.js'
import { Transfer } from './AddNewScreen/AddNewTransfer.js'

// get the screen heightr
const SCREEN_HEIGHT = Dimensions.get('window').height;

const categories = ['Food', 'Shopping', 'Accommodation', 'Transportation', 'Entertainment'];

// content for transfer screen
// function Transfer() {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleModalVisibility = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   return (
//     <View>
//       <Button title="Open Modal" onPress={handleModalVisibility} />
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         onRequestClose={handleModalVisibility}
//         >
//         <View style={styles.container}>
//           <Text>This is the modal content</Text>
//           <Button title="Close Modal" onPress={handleModalVisibility} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

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
  content: {
    margin: 3
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