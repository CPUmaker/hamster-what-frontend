import React from "react";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Alert} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// for password and faceID
import ReactNativeBiometrics from 'react-native-biometrics'


import { Card, Icon, ListItem} from '@rneui/themed';


import { MaterialCommunityIcons, 
         MaterialIcons,
         Octicons,
         Entypo,
         AntDesign,} from '@expo/vector-icons';

const deleteCheck = () => 
Alert.alert('Deleting profile', 'This action will permanently delete your profile and can not be undo, are you sure?', [
{
    text: 'Confirm',
    onPress: () => console.log('Confirm Pressed'),
    style: 'destructive',
},
{   text: 'Cancel', 
    onPress: () => console.log('Cancel Pressed')},
]);   

export default function SettingsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={{ padding: 20 }}>
            <View>
            <Text style={styles.settings_title}>Account Settings</Text>
            
            <TouchableOpacity onPress={() => {navigation.navigate('')}}>
            <ListItem containerStyle={styles.container_item}>
                <MaterialCommunityIcons name="account" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title>Profile</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </TouchableOpacity>



            <ListItem containerStyle={styles.container_item}>
                <Octicons name="checklist" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title>Account Information</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem containerStyle={styles.container_item}>
                <Entypo name="bell" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title>Subscription</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            
            <Text style={styles.settings_title}>App Settings</Text>
            <ListItem containerStyle={styles.container_item}>
                <MaterialCommunityIcons name="cloud-sync-outline" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title>Sync</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>

            <TouchableOpacity onPress={() => {navigation.navigate('ApperaranceScreen')}}>
            <ListItem containerStyle={styles.container_item}>
                <MaterialCommunityIcons name="theme-light-dark" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title>Apperarance</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {navigation.navigate('Notification')}}>
            <ListItem containerStyle={styles.container_item}>
                <Entypo name="notification" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title>Notification</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </TouchableOpacity>

            <Text style={styles.settings_title}>Security</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('Password')}}>
                
                <ListItem containerStyle={styles.container_item}>
                    <MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />
                    <ListItem.Content>
                    <ListItem.Title>Password</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('FaceID_TouchID')}}>
            <ListItem containerStyle={styles.container_item}>
                <MaterialCommunityIcons name="face-recognition" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title>FaceID / TouchID</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </TouchableOpacity>

            <Text style={styles.settings_title}>Support</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('Contact Us')}}>
                <ListItem containerStyle={styles.container_item}>
                    <AntDesign name="phone" size={24} color="black" />
                    <ListItem.Content>
                    <ListItem.Title>Contact us</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>
            

            <TouchableOpacity onPress={deleteCheck}>
            <ListItem containerStyle={styles.container_item}>
                <MaterialIcons name="delete-outline" size={24} color="black" />
                <ListItem.Content>
                <ListItem.Title style={{color:'red',fontWeight: 'bold'}}>Delete profile</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </TouchableOpacity>

            <View style={{marginBottom: 5}}></View>
            <View></View>

            <Text style={styles.settings_title}>Miscellaneous</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('Terms & Conditions')}}>
            <ListItem containerStyle={styles.container_item}>
                <ListItem.Content>
                <ListItem.Title>Terms & Conditions</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {navigation.navigate('Privacy Policy')}}>
            <ListItem containerStyle={styles.container_item}>
                <ListItem.Content>
                <ListItem.Title>Privacy Policy</ListItem.Title>
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
        paddingTop: 10,
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