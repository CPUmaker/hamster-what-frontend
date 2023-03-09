import React, { useState } from 'react';
import { View, TextInput, StyleSheet , TouchableOpacity, Keyboard} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function MoneyInput(amount, setAmount) {
  // const [amount, setAmount] = useState('');

  validateAmount = (text) => {
    var re = /^([1-9][0-9,]*)?(\.[0-9]{0,2})?$/;
      return re.test(text);
  };

  function handleAmountChange(text) {
    // console.log(validateAmount(text));
    if (validateAmount(text)) {
      const formattedText = text
        .replace(/[^0-9.]/g, '') // Remove any non-numeric characters
        // .replace(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/g, '')
        .replace(/^0+/, '') // Remove leading zeros
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands separator
      setAmount(formattedText);
    }
  }

  const handleSavePress = (amount) => {
    setAmount(amount)
    console.log(`Amount confirmed: ${amount}`);
    Keyboard.dismiss();
  };

  function handleConfirmClick() {
    console.log(`Amount confirmed: ${amount}`);
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoFocus={false}
        placeholder="$0.00"
        keyboardType="numeric"
        onChangeText={handleAmountChange}
        value={amount}
      />
     
      <TouchableOpacity onPress={() => handleMoneyPress(amount)}>
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
    maxWidth: 400,
    padding: 10,
    borderWidth: 0,
    borderRadius: 0,
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent:'center',
  },
});
