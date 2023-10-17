import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CafeListComponent = ({ cafes }) => (
  <View style={styles.container}>
    <Text style={styles.cafeListHeader}>Explore Nearby Cafes</Text>
    <FlatList
      data={cafes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.cafeListItem}>
          <Text style={styles.cafeName}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Latitude:</Text>
            <Text style={styles.cafeLocation}>{item.latitude}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Longitude:</Text>
            <Text style={styles.cafeLocation}>{item.longitude}</Text>
          </View>
          
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  cafeListHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
    textAlign: 'center',
  },
  cafeListItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 16,
  },
  cafeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  locationLabel: {
    fontSize: 16,
    color: '#666',
  },
  cafeLocation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CafeListComponent;
