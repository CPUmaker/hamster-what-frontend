import { React, useContext }from "react";
import { View, StyleSheet, TouchableOpacity} from "react-native";
import { ListItem, Avatar} from "@rneui/base";

import { AuthContext } from "../context/AuthContext";
 
export default function ProfileScreen({ navigation }) {
    const {userInfo} = useContext(AuthContext);
    const list = [
        {
            Title:'User Name',
            Subtitle: userInfo.username,
            Nav:'Set'
        },
        /* TODO */
        {
            Title:'Email',
            Subtitle: 'email@email.com',
            Nav:'Set'
        },
        {
            Title:'Birthday',
            Subtitle: '2023-01-23',
            Nav:'Set'
        },
        {
            Title:'Location',
            Subtitle: 'Waterloo, CA',
            Nav:'Set'
        },
        {
            Title:'Organization',
            Subtitle: 'UW',
            Nav:'Set'
        },
        {
            Title:'My Account Books',
            Subtitle: ' ',
            Nav:'Set'
        },
    ]
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
            <TouchableOpacity onPress={() => navigation.navigate(l.Nav)}>
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
    }
  });
  