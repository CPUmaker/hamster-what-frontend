import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Checking account', icon: 'wallet', color: '#f39c12' },
  { id: 2, name: 'Credit account', icon: 'card-outline', color: '#9b59b6' },
  { id: 3, name: 'Cash', icon: 'cash-outline', color: '#3498db' },
  { id: 4, name: 'Savings account', icon: null, other_icon: <MaterialCommunityIcons name="piggy-bank" size={32} color={'#2c3e50'}/>, color: '#2c3e50'},
  { id: 5, name: 'Other', icon: 'reorder-three', color: '#A4907C' },
];

export function WalletSelect(WalletName) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryPress = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId)
    WalletName(categoryName)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Wallet:</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategoryId === category.id && { backgroundColor: category.color },
          ]}
          onPress={() => handleCategoryPress(category.id, category.name)}
        >
          <View style={styles.categoryIcon}>
            {category.icon === null ?
            category.other_icon
            : <Ionicons name={category.icon} size={32} color={category.color} />}
          </View>
          <Text style={[styles.categoryName, selectedCategoryId === category.id && { color: '#ffffff' }]}>{category.name}</Text>
        </TouchableOpacity>
      ))}
      <Text>
        {/* You selected the {selectedCategoryName} category. */}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    width: 380,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryIcon: {
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    marginRight: 10,
    padding: 10,
  },
  categoryName: {
    fontSize: 16,
    color: '#333333',
  },
});
