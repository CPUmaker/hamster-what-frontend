import { React, useContext, useEffect, useState }from "react";
import { View, StyleSheet, TouchableOpacity, DeviceEventEmitter, Modal, Text, Pressable, TouchableWithoutFeedback} from "react-native";
import { ListItem, Avatar} from "@rneui/base";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import { SelectList } from 'react-native-dropdown-select-list'
import axios from "axios";
import CountryStateList from "../../assets/country-state-list.json"

import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";

export default function ProfileScreen({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [ifReadProfile, setReadProfile] = useState(true);
    const [ifListen, setListen] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const {userInfo} = useContext(AuthContext);
    const [CountryRegion, setCountryRegion] = useState("");
    const [StateRegion, setStateRegion] = useState("");

    let countryList = [];
    let {readProfile, userProfile} = useContext(ProfileContext);
    
    useEffect(() => {
        if(ifListen){
            DeviceEventEmitter.addListener("bio_receive",() => {setReadProfile(true)});
            setListen(false);
        }
    })
    useEffect(() => {
        if(ifReadProfile) {
            readProfile();
            setReadProfile(false);
        }
    })

    useEffect(() => {
        //console.log(CountryStateList.countries);
        for(var id in CountryStateList.countries){
            countryList.push({key: id.toString(), value: CountryStateList.countries[id].country})
        }
    })
    /* Profile data*/ 
    const list = [
        {
            Title:'User Name',
            Subtitle: userInfo.username,
            Nav:'User Name'
        },
        /* TODO */
        {
            Title:'Email',
            Subtitle: userInfo.email,
            Nav:'Email'
        },
        {
            Title:'Birthday',
            Subtitle: userProfile.birthday,
            Nav:'Set'
        },
        {
            Title:'Location',
            Subtitle: userProfile.city + ' ' + userProfile.country,
            Nav:'Set'
        },
        {
            Title:'Affiliation',
            Subtitle: userProfile.affiliation,
            Nav:'Affiliation'
        },
        {
            Title:'Bio',
            Subtitle: userProfile.bio,
            Nav:'Bio'
        },
        {
            Title:'My Account Books',
            Subtitle: ' ',
            Nav:'Set'
        },
    ]

    /* date */
    const handleDateConfirm = (date) => {
        //console.log(date);
        axios
          .patch(`${BASE_URL}/api/profile`, {birthday: date.toLocaleDateString('en-CA')})
          .catch((error) => {
            console.log(`Set birthday error: ${error}`)
          })    
        hideDatePicker();
        setReadProfile(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    /* country-state */
    const getStatelist = (CountryName)=> {
        let stateL = []
        if(CountryName != "")  stateL = CountryStateList.countries.find((e) => e.country == CountryName);
        else stateL = []
        let stateList = []
        for(var id in stateL.states){
            stateList.push({key: (id).toString(), value: stateL.states[id]});
        }
        //console.log(stateList)
        return stateList;
    }

    const handleCountryStateConfirm = (country, state) => {
        axios
          .patch(`${BASE_URL}/api/profile`, {country: country, city: state})
          .catch((error) => {
            console.log(`Set Country City error: ${error}`)
          })    
        setModalVisible(!modalVisible);
        setCountryRegion("");
        setReadProfile(true);
    }

    const mapItems = list.map((l, i) =>
        <ListItem bottomDivider key={i}>
            <ListItem.Content>
                <ListItem.Title >{l.Title}
                </ListItem.Title>
            </ListItem.Content>       
            <Avatar style={styles.content}>
                <ListItem.Subtitle >{l.Subtitle}
                </ListItem.Subtitle>
            </Avatar>
            <TouchableOpacity onPress={() => {
                if(i == 2){
                    setDatePickerVisibility(true);
                }
                else if(i == 3){
                    setModalVisible(true);
                }
                else{
                    navigation.navigate(l.Nav);
                }
            }}>           
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={()=>this.setState({modalVisible:false})}>
                        <View  style={{position:'absolute',backgroundColor:'rgba(0,0,0,.5)'}}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                        <View style = {styles.selectBoxStyle}>
                            <SelectList 
                                //boxStyle = {styles.selectBoxStyle}
                                setSelected={(val) => setCountryRegion(val)} 
                                data={countryList} 
                                save="value"
                            />
                        </View>
                        <View style = {styles.selectBoxStyle}>
                        <SelectList 
                            //boxStyles= {styles.selectBoxStyle}
                            setSelected={(val) => setStateRegion(val)} 
                            data={getStatelist(CountryRegion)}  
                            save="value"
                        /> 
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => handleCountryStateConfirm(CountryRegion, StateRegion)}>
                            <Text style={styles.textStyle}>Confirm</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                setCountryRegion("");
                            }}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
                <ListItem.Chevron />
            </TouchableOpacity>
        </ListItem>       
    )

    return (
        <View style={styles.container}>
        <ListItem bottomDivider>          
            <ListItem.Content>
                <ListItem.Title>Profile Photo</ListItem.Title>
            </ListItem.Content>
            <Avatar
                rounded
                source={ require("../../assets/profile.jpg") }           
            />
            <TouchableOpacity onPress={() => navigation.navigate("Set")}>
                <ListItem.Chevron />
            </TouchableOpacity>
            
        </ListItem>   
            {mapItems}
        </View>    
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
    },
    content:{
        margin:3
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 70,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        margin: 20,
        width: 150,
    },
    buttonOpen: {
        backgroundColor: "#AD40AF",
    },
    buttonClose: {
        backgroundColor: "#A5C9CA",
    },
    textStyle: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 14,
        color: "#fff",
    },
    selectBoxStyle:{
        width: 200,
        margin: 10
    }
    
  });
  