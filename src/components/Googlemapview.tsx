import { View, ActivityIndicator, Dimensions, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import locationimage from "@/assets/location.png"
import { useDispatch, useSelector } from 'react-redux'
import { Setlocation } from '@/Store/locationSlice'
import { RootState } from '@/Store/Store'

const { width } = Dimensions.get('screen')
const { height } = Dimensions.get('screen')

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
export default function Googlemapview() {
  const [mapregion, setmapregipon] = useState<Region | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      if (!isLocationEnabled) {
        setLoading(false)
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        console.log('Permission to access location was denied');
        return
      }


      let currentLocation = await Location.getCurrentPositionAsync({});
      if (currentLocation) {
        const regionn: Region = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0542,
          longitudeDelta: 0.0421,
        };
        setmapregipon(regionn)
        setLoading(false)
        dispatch(Setlocation(regionn))
      }
    })();
  }, []);

  const requestLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    if (currentLocation) {
      const regionn: Region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setmapregipon(regionn);
      dispatch(Setlocation(regionn));
    }

  }


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  else {

    return (
      <View style={{ marginTop: 10, }}>
        <Text style={{
          fontSize: 20,
          marginBottom: 10, fontWeight: "600", fontFamily : 'railway-bold'
        }}>
          Top Near By Places
        </Text>
        <View style={{ borderRadius: 20, overflow: 'hidden' }}>
          <MapView
            style={{
              width: width * 0.9,
              height: height * 0.28,

            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapregion ?? undefined}
          >
            <Marker 
            title='you'
            coordinate={mapregion || { latitude: 24.8607, longitude: 67.0011 }}
            />
          </MapView>
          <TouchableOpacity
            style={styles.locateButton}
            onPress={requestLocation}
          >
            <Image
              source={locationimage}
              style={styles.locateButtonText} />

          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  locateButton: {
    position: 'absolute',
    top: 60, // Distance from the bottom
    right: 10, // Align to the right
    backgroundColor: '#FFF6E9',
    paddingVertical: 8,
    paddingHorizontal: 10,
    // borderRadius: 20,
  },
  locateButtonText: {
    width: 20,
    height: 20,
    objectFit: 'cover'
  },
})


