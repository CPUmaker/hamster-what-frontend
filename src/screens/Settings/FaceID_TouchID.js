import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Biometrics from 'react-native-biometrics';

export function FaceID_TouchID() {
  const [biometricResult, setBiometricResult] = useState(null);

  const authenticateWithBiometrics = async () => {
    const { success, error } = await Biometrics.simplePrompt('Authenticate with FaceID');
    if (success) {
      setBiometricResult('Authentication successful!');
    } else {
      setBiometricResult(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Authenticate with FaceID" onPress={authenticateWithBiometrics} />
      <Text>{biometricResult}</Text>
    </View>
  );
}
