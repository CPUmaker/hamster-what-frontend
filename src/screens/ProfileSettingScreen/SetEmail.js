import { Formik } from "formik";
import React, {useEffect, useContext} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";
import * as yup from 'yup';

import { AuthContext } from "../../context/AuthContext";

const setEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter your email address."),
});

export default function SetEmail({navigation}) {
    const {userInfo} = useContext(AuthContext);

    useEffect(() => {
        navigation.getParent().setOptions({swipeEnabled: false});
      }, [])
    useEffect(() => {
        navigation.addListener('beforeRemove', () => {
            navigation.getParent().setOptions({swipeEnabled: true});
        })
    }, [navigation]);
    return (
      //TODO onSubmit   
      <Formik
        validationSchema={ setEmailSchema }
        initialValues={{ email: userInfo.email }}
        onSubmit={values => {
          console.log(values.email);
          Alert.alert('Confirmation has been sent')
          navigation.goBack();
        }}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View style = {styles.container} >
          <Text style = {styles.discription} >Please enter your email address.</Text>  
          <View style = {styles.textinput_container}>      
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.text_input}
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
          />
          </View> 
          {errors.email && (
            <Text style={styles.error_text}>{errors.email}</Text>
          )}
          <TouchableOpacity 
            style={[styles.submit_button,{
              backgroundColor:
                (touched.email)&&
                isValid
                  ? "#AD40AF"
                  : "#A5C9CA",
            },
          ]}            
            disabled = {!touched.email||!isValid}          
            onPress={handleSubmit}>
            <Text style={styles.submit_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      </Formik>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  discription:{
      margin: 20,
      fontSize: 16,
      color: "#888",
  },
  text_input:{
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  submit_button: {
    backgroundColor: "#AD40AF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    margin: 20
  },
  submit_text: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
  error_text: {
    fontSize: 10,
    color: "#FF0D10",
    marginBottom: 5,
    marginLeft: 20,
  },
  textinput_container: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    margin: 20,
  },
});