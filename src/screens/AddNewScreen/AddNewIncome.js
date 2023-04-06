import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "react-native-modal";
import { ListItem } from "@rneui/base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { getToday } from "react-native-common-date-picker/src/utils/dateFormat.js";

import { CategorySelectionIncome } from "./CategorySelectIncome.js";
import { endpoints } from "../../config";
import { MoneyInput } from "./MoneyInput.js";
import { WalletSelect } from "./WalletSelect.js";
import { categories_map, wallets_map, getKeyByValue } from "./utils.js";

// get the screen height
const SCREEN_HEIGHT = Dimensions.get("window").height;
const Stack = createStackNavigator();

//// content for Expense interface -------------
export function Income({ route, navigation }) {
  // initialize the details for a bill
  let {
    categories = 8,
    comment = "",
    date = getToday(),
    price = "",
    wallet = 4,
  } = route.params === undefined ? {} : route.params;
  categories = getKeyByValue(categories_map, categories);
  wallet = getKeyByValue(wallets_map, wallet);

  const [text, setText] = useState(comment);

  // Category modal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  // From Modal
  const [WalletmodalVisible, setWalletModalVisible] = useState(false);
  const WalletOpenModal = () => {
    setWalletModalVisible(true);
  };
  const WalletCloseModal = () => {
    setWalletModalVisible(false);
  };

  // variable for date picker
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const handleDateConfirm = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
    setIsDatePickerVisible(false);
  };
  const handleDateCancel = () => {
    setIsDatePickerVisible(false);
  };

  // variable for category select
  const [selectedCategoryName, setSelectedCategoryName] = useState(categories);
  const [selectedWallet, setselectedWallet] = useState(wallet);

  // fix the issues when swipe to the right will bring out sidebar
  useEffect(() => {
    navigation.getParent().setOptions({ swipeEnabled: false });
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      navigation.getParent().setOptions({ swipeEnabled: true });
    });
  }, [navigation]);

  // for money input
  const [amount, setAmount] = useState(price);

  const done = (amount) => {
    data = {
      title: selectedCategoryName.toString(),
      date: selectedDate.toString(),
      price: amount == "" ? "0" : amount.replace(/[^0-9.]/g, "").toString(),
      categories: categories_map[selectedCategoryName.toString()],
      wallet: wallets_map[selectedWallet.toString()],
      comment: text.toString(),
    };
    console.log(data);
    axios.post(endpoints.bill, data);
    // console.log(text.toString())
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        {/* -------------0--------------- */}
        {MoneyInput(amount, setAmount)}

        {/* -------------1--------------- */}
        <TouchableOpacity onPress={openModal}>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modal}>
              {CategorySelectionIncome(setSelectedCategoryName)}
              <TouchableOpacity onPress={closeModal} style={styles.doneButton}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <ListItem bottomDivider>
            <FontAwesome5 name="money-bill-wave" size={20} color="#B2B2B2" />

            <ListItem.Content>
              <ListItem.Title>Category: {selectedCategoryName}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>

        {/* -------------2--------------- */}
        <TouchableOpacity onPress={WalletOpenModal}>
          <Modal
            visible={WalletmodalVisible}
            animationType="slide"
            onRequestClose={WalletCloseModal}
          >
            <View style={styles.modal}>
              {WalletSelect(setselectedWallet)}
              <TouchableOpacity
                onPress={WalletCloseModal}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <ListItem bottomDivider>
            <Entypo name="wallet" size={24} color="#B2B2B2" />
            <ListItem.Content>
              <ListItem.Title>To: {selectedWallet}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>

        <ListItem bottomDivider>
          <FontAwesome5 name="sticky-note" size={24} color="#B2B2B2" />
          <ListItem.Content>
            <ListItem.Title>Note: </ListItem.Title>
            <TextInput
              style={styles.input}
              placeholder="Type here to write down your note "
              onChangeText={(newText) => setText(newText)}
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

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={handleDateCancel}
        />

        {/* -------------save button--------------- */}
        <TouchableOpacity
          onPress={() => done(amount)}
          style={styles.saveButton}
        >
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  content: {
    margin: 3,
  },
  input: {
    height: 40,
    margin: -5,
    borderWidth: 0,
    padding: 5,
  },

  button: {
    backgroundColor: "#A04AAA",
    width: 160,
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  doneButton: {
    backgroundColor: "#A04AAA",
    width: 160,
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  saveButton: {
    alignSelf: "center",
    backgroundColor: "#A04AAA",
    width: 370,
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedDateText: {
    marginVertical: 10,
  },
  modal: {
    flex: 0.7,
    margin: 0,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
