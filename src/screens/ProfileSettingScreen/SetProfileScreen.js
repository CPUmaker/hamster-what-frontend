import React, {useEffect} from "react";
import { View, Text } from "react-native";

export default function SettingsScreen({navigation}) {
    useEffect(() => {
        navigation.getParent().setOptions({swipeEnabled: false});
      }, [])
    useEffect(() => {
        navigation.addListener('beforeRemove', () => {
            navigation.getParent().setOptions({swipeEnabled: true});
        })
    }, [navigation]);
    
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Set Profile</Text>
        </View>
    );
}