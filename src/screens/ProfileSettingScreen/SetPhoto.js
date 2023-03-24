import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, DeviceEventEmitter } from 'react-native';
import axios from "axios";

import { BASE_URL, endpoints } from "../../config";
const images = [
  require('../../../assets/profile01.png'),
  require('../../../assets/profile02.png'),
  require('../../../assets/profile03.png'),
  require('../../../assets/profile04.png'),
  require('../../../assets/profile05.png'),
  require('../../../assets/profile06.png'),
];

const ImageSelector = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEmit, setEmit] = useState(true);
  const [confirmColor, setConfirmColor] = useState("#A5C9CA")

  useEffect(() => {
    navigation.getParent().setOptions({swipeEnabled: false});
  }, [])
  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      navigation.getParent().setOptions({swipeEnabled: true});
    })
}, [navigation]);

  const handleImagePress = (index) => {
    setSelectedImage(index);
    setConfirmColor("#AD40AF")
  };

  const handleConfirmPress = () => {
    if (selectedImage !== null) {
      //console.log(`Selected [image index]: ${selectedImage}`);
      axios
        .patch(endpoints.profile, {photo : (selectedImage + 1)})
        .catch((error) => {
          console.log(`Set photo error: ${error}`)
        })
      if(isEmit){
        DeviceEventEmitter.emit('bio_receive', true);
        setEmit(false);
      }
      navigation.goBack();
    }
  };

  const { width: windowWidth } = Dimensions.get('window');
  const imageWidth = (windowWidth - 40) / 3;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {images.slice(0, 3).map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
            <Image
              source={image}
              style={[
                styles.image,
                selectedImage === index && styles.selectedImage,
                { width: imageWidth, height: imageWidth },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.imageContainer}>
        {images.slice(3, 6).map((image, index) => (
          <TouchableOpacity key={index + 3} onPress={() => handleImagePress(index + 3)}>
            <Image
              source={image}
              style={[
                styles.image,
                selectedImage === index + 3 && styles.selectedImage,
                { width: imageWidth, height: imageWidth },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleConfirmPress} style={[styles.saveButton, {backgroundColor: confirmColor}]}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  image: {
    marginVertical: 5,
    marginHorizontal: 3,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: '#AD40AF',
    opacity: 0.5,
  },
  saveButton: {
    alignSelf: 'center',
    width: 370,
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ImageSelector;