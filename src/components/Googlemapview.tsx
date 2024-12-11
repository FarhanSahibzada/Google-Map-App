import { View, ActivityIndicator, Dimensions, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import locationimage from "@/assets/location.png"
import { useDispatch, useSelector } from 'react-redux'
import { Setlocation } from '@/Store/locationSlice'
import { RootState } from '@/Store/Store'
import PlaceMarker from './PlaceMarker'

const { width } = Dimensions.get('screen')
const { height } = Dimensions.get('screen')

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type placelistprops = any;

export default function Googlemapview({ placelist, routes }: { placelist: any; routes?: any }) {
  const [mapregion, setmapregipon] = useState<Region | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      if (!isLocationEnabled) {
        setLoading(false)
        return
      }

      try {

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

      } catch (error) {
        throw new Error("cannot get location");
        console.log(error);

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

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "600",
        fontFamily: 'railway-bold'
      }}>
        Top Near By Places
      </Text>
      <View style={{ borderRadius: 20, overflow: 'hidden' }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <MapView
            style={{
              width: width * 0.9,
              height: height * 0.28,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapregion || {
              latitude: 24.8607,
              longitude: 67.0011,
              latitudeDelta: 0.0542,
              longitudeDelta: 0.0421
            }}
          >
            {placelist.map((items: any, index: number) => index <= 6 && (
              <PlaceMarker item={items} key={index} />
            ))}
            {routes && (
              <Polyline coordinates={routes} strokeWidth={4} strokeColor="blue" />
            )}
          </MapView>
        )}

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


