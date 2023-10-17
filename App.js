import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button,} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { fetchCafes } from './MapComps/api';
import CafeListComponent from './MapComps/CafeListComponent';
import MapComponent from './MapComps/MapComponent';
const App = () => {
  
  const getCurrentLocation = () => {
    console.log(Geolocation.getCurrentPosition)
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerCoordinate({ latitude, longitude });
        setNewLatitude(latitude.toString());
        setNewLongitude(longitude.toString());
      },
      (error) => {
        console.error(error);
      },
      
    );
  };
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 33.7181431,
    longitude: 73.026183
  });

  const [newLatitude, setNewLatitude] = useState('');
  const [newLongitude, setNewLongitude] = useState('');
  const [cafes, setCafes] = useState([]);

  const handleMarkerDragEnd = (e) => {
    if (e.nativeEvent) {
      setMarkerCoordinate(e.nativeEvent.coordinate);
      fetchCafes();
    } else {
      console.error('Invalid coordinate data in handleMarkerDragEnd');
    }
  };

  const updateMarkerCoordinates = async () => {
    const latitude = parseFloat(newLatitude);
    const longitude = parseFloat(newLongitude);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      setMarkerCoordinate({ latitude, longitude });
      const newCafes = await fetchCafes(latitude, longitude, 35000);
      setCafes(newCafes);
    } else {
      console.error('Invalid latitude or longitude');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapComponent
          markerCoordinate={markerCoordinate}
          handleMarkerDragEnd={handleMarkerDragEnd}
          cafes={cafes}
        />
        <TextInput
          placeholder="Enter Latitude"
          value={newLatitude}
          onChangeText={(text) => setNewLatitude(text)}
        />
        <TextInput
          placeholder="Enter Longitude"
          value={newLongitude}
          onChangeText={(text) => setNewLongitude(text)}
        />
        <Button title="Update Marker" onPress={updateMarkerCoordinates} />
        <Button title="Update location" onPress={getCurrentLocation} />
        <CafeListComponent cafes={cafes} /> 
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
