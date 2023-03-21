import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { BASE_URL, endpoints } from "../config";
import { AuthContext } from "./AuthContext";

export const ProfileContext = createContext();

export const PeofileProvider = ({ children }) => {
  let [userProfile, setUserProfile] = useState(null);
  const {logout} = useContext(AuthContext); 

  const readProfile = () => {
    axios
      .get(endpoints.profile)
      .then((res) => {
        let data = res.data;
        setUserProfile(data);
        AsyncStorage.setItem("userProfile", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(`read Profile error: ${error}`);
        if(error.response.status === 401){
          logout();
        }
      });
  };

  const isReadProfile = async() =>{
    try{
      userProfile = await AsyncStorage.getItem("userProfile");
      userProfile = JSON.parse(userProfile);
      if(userProfile){
        setUserProfile(userProfile);
        console.log(userProfile);
      }
    }
    catch (error) {
        console.log(`ReadProfile error: ${error}`);
    }
};

useEffect(()=>{
    isReadProfile();
}, [])

  return (
    <ProfileContext.Provider value={{ readProfile, userProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
