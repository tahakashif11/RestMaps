import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
const App = () => {
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.error('Location permission denied.');
        }
      } catch (err) {
        console.error(err);
      }
    };
    requestLocationPermission();
  }, []);
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
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 33.7181431,
    longitude:  73.026183
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
      await fetchCafes(); 
    } else {
      console.error('Invalid latitude or longitude');
    }
  };

  const fetchCafes = async () => {
    console.log("Fetching hospitals..."); 
    const url = 'https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=' + markerCoordinate.latitude + ',' + markerCoordinate.longitude + '&type=bank&radius=180&language=en';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2a54ec8c1bmshbc6d09965937ac5p141b50jsne4194616f85f',
        'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("Cafe data:", result); 
      if (result && result.results) {
        const cafeLocations = result.results.map((cafe, index) => ({
          id: index,
          name: cafe.name,
          latitude: cafe.location.lat,
          longitude: cafe.location.lng,
        }));
        console.log("Cafe locations:", cafeLocations); 
        setCafes(cafeLocations);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCafes();
  }, [markerCoordinate]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 33.7181431,
    longitude:  73.026183,
            latitudeDelta: 0.9999,
            longitudeDelta: 0.9999,
          }}
        >
          <Marker
            draggable
            coordinate={markerCoordinate}
            onDragEnd={handleMarkerDragEnd}
            title={'Custom Marker'}
            description={'This is a custom marker'}
          />
          {cafes.map((cafe) => (
            <Marker
              key={cafe.id}
              coordinate={cafe}
              title={cafe.name}
              description="A nearby cafe"
            />
          ))}
        </MapView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
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

export default App;
