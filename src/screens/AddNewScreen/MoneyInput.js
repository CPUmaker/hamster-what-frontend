import React, { useState } from 'react';
import { View, TextInput, StyleSheet , TouchableOpacity, Keyboard} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function MoneyInput() {
  const [amount, setAmount] = useState('');

  function handleAmountChange(text) {
    const formattedText = text
      .replace(/[^0-9]/g, '') // Remove any non-numeric characters
      .replace(/^0+/, '') // Remove leading zeros
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands separator
    setAmount(formattedText);
  }

  function handleConfirmClick() {
    console.log(`Amount confirmed: ${amount}`);
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="$0.00"
        keyboardType="numeric"
        onChangeText={handleAmountChange}
        value={amount}
      />
      <TouchableOpacity onPress={handleConfirmClick}>
        <Ionicons name="checkmark-outline" size={30} color="#4CAF50" />
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    maxWidth: 200,
    padding: 10,
    borderWidth: 0,
    borderRadius: 0,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent:'center',
  },
});
