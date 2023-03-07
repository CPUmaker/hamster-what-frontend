import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Wallet1', icon: 'Wallet', color: '#f39c12' },
  { id: 2, name: 'Wallet2', icon: 'Wallet', color: '#9b59b6' },
  { id: 3, name: 'Wallet3', icon: 'Wallet', color: '#3498db' },
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
            <Ionicons name={category.icon} size={32} color={selectedCategoryId === category.id ? '#ffffff' : category.color} />
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
