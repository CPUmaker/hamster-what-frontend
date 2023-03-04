import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export function Income() {
  const [amount, setAmount] = useState('');

  function handleAmountChange(text) {
    const formattedText = text
      .replace(/[^0-9]/g, '') // Remove any non-numeric characters
      .replace(/^0+/, '') // Remove leading zeros
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands separator
    setAmount(formattedText);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
