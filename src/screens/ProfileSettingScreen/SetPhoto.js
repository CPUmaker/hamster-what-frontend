import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, DeviceEventEmitter } from 'react-native';
import axios from "axios";

import { BASE_URL, endpoints } from "../../config";
const images = [
  require('../../../assets/profile01.jpg'),
  require('../../../assets/profile02.jpg'),
  require('../../../assets/profile03.jpg'),
  require('../../../assets/profile04.jpg'),
  require('../../../assets/profile05.jpg'),
  require('../../../assets/profile06.jpg'),
];

const ImageSelector = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEmit, setEmit] = useState(true);

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
  };

  const handleConfirmPress = () => {
    if (selectedImage !== null) {
      console.log(`Selected [image index]: ${selectedImage}`);
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
        <TouchableOpacity onPress={handleConfirmPress} style={styles.saveButton}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    marginHorizontal: 5,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: '#AD40AF',
    opacity: 0.5,
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ImageSelector;