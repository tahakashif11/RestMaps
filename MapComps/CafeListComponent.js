import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CafeListComponent = ({ cafes }) => (
  <View style={styles.container}>
    <Text style={styles.cafeListHeader}>Nearby Cafes:</Text>
    <FlatList
      data={cafes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.cafeListItem}>
          <Text style={styles.cafeName}>{item.name}</Text>
          <Text style={styles.cafeLocation}>{`Lat: ${item.latitude}, Long: ${item.longitude}`}</Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cafeListHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cafeListItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  cafeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cafeLocation: {
    fontSize: 14,
  },
});

export default CafeListComponent;
