import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapComponent = ({ markerCoordinate, handleMarkerDragEnd, cafes }) => (
  <View style={styles.container}>
    <MapView
      style={styles.mapStyle}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: markerCoordinate.latitude,
        longitude: markerCoordinate.longitude,
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
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
  },
});

export default MapComponent;
