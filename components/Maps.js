import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

const Maps = (props) => {
  const LATITUDE_DELTA = 0.1
  const LONGITUDE_DELTA = 0.1

  const [location, setLocation] = useState(undefined)
  const [hasLocationPermission, setHasLocationPermission] = useState(undefined)
  const [marker, setMarker] = useState(props.taskLocation)

  useEffect(() => {
    // Request permission for location when the component is mounted
    getLocationAsync()
  }, [])

  useEffect(() => {
    // Set marker hook value to taskLocation prop when taskLocation prop is changed
    // Component doesn't automatically re-render when prop is changed which is why useEffect is needed
    setMarker(props.taskLocation)
  }, [props.taskLocation])

  const getLocationAsync = async () => {
    // Request location permission from user
    let { status } = await Location.requestPermissionsAsync()

    // Set location permission as not granted
    if (status != 'granted') {
      setHasLocationPermission(false)
      return
    }

    // Set location permission as granted
    setHasLocationPermission(true)
    // Get current location
    let location = await Location.getCurrentPositionAsync()
    // Set current location latlng and deltas to an object
    let coordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }

    // Set location object as location hook value
    setLocation(coordinates)
  }

  // If location permission hasn't granted yet, show text to user
  if (hasLocationPermission === undefined) {
    return (
      <View>
        <Text>Waiting for permissions</Text>
      </View>
    )
  }

  return (
    // Container component for presenting content above an enclosing view
    <Modal
      // Modal fades into view
      animationType='fade'
      // Gets visible boolean value from hook, false by default
      visible={props.isVisible}
      // Modal is not transparent
      transparent={false}
      // Close function to modal when user taps the hardware back button (or uses gesture navigation) on Android
      onRequestClose={() => props.onClose(marker)}
    >
      <View style={styles.root}>
        {/* Provides a Map component that uses Apple Maps or Google Maps on iOS and Google Maps on Android */}
        <MapView
          // Renders map with an inital region, user's current location by default
          initialRegion={location}
          // Long press function: sets location marker to map
          onLongPress={(e) => setMarker(e.nativeEvent.coordinate)}
          style={styles.maps}
        >
          {/* Show marker on map if marker has been set */}
          {marker && <Marker coordinate={marker} />}
        </MapView>
        {/* Button on map which closes the map view */}
        <TouchableOpacity
          onPress={() => props.onClose(marker)}
          style={styles.button}
        >
          <Text style={{ color: 'white' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maps: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: 'teal',
    padding: 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
  },
})

export default Maps
