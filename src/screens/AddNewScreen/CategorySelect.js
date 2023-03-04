import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Food', icon: 'fast-food-outline', color: '#f39c12' },
  { id: 2, name: 'Transportation', icon: 'bus-outline', color: '#9b59b6' },
  { id: 3, name: 'Shopping', icon: 'cart-outline', color: '#3498db' },
  { id: 4, name: 'Entertainment', icon: 'game-controller-outline', color: '#e74c3c' },
  { id: 5, name: 'Housing', icon: 'home-outline', color: '#2c3e50' },
  { id: 6, name: 'Utilities', icon: 'flash-outline', color: '#27ae60' },
];

export function CategorySelection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryPress = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    setSelectedCategoryId(categoryId);
    // setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a category:</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategoryId === category.id && { backgroundColor: category.color },
          ]}
          onPress={() => handleCategoryPress(category.id)}
        >
          <View style={styles.categoryIcon}>
            <Ionicons name={category.icon} size={32} color={selectedCategoryId === category.id ? '#ffffff' : category.color} />
          </View>
          <Text style={[styles.categoryName, selectedCategoryId === category.id && { color: '#ffffff' }]}>{category.name}</Text>
        </TouchableOpacity>
      ))}
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
