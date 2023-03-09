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

import { CategorySelectionIncome } from './CategorySelectIncome.js'
import { MoneyInput } from './MoneyInput.js'

export function Transfer({ navigation }) {
    // fix the issues when swipe to the right will bring out sidebar
    useEffect(() => {
        navigation.getParent().setOptions({ swipeEnabled: false });
    }, [])

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            navigation.getParent().setOptions({ swipeEnabled: true });
        })
    }, [navigation])
    const [text, setText] = useState('');

    // variable for category modal
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


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.container}>
                {MoneyInput()}

                {/* -------------save button--------------- */}
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.saveButton}>
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