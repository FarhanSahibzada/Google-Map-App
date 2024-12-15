import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Region } from './Googlemapview'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Store/Store'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import PlaceMarker from './PlaceMarker'
import * as Location from 'expo-location'
import { Setlocation } from '@/Store/locationSlice'
import locationimage from "@/assets/location.png"

export default function GoogleMapFull({ placeList }: any) {
  const [mapRegion, setMapRegion] = useState<Region | null>(null)
  const dispatch = useDispatch()
  const [text, setText] = useState(true)
  const [main, setMain] = useState('');


  useEffect(() => {
    (async () => {
      // const isLocationEnabled = await Location.hasServicesEnabledAsync();
      // if (!isLocationEnabled) {
      //   return
      // }

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
          setMapRegion(regionn)
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

      setMapRegion(regionn);
      dispatch(Setlocation(regionn));
    }
  }

  useEffect(() => {
    if (placeList && placeList.length > 0) {
      setText(false);
      const letters = placeList[0].display_name;
      const wordstrim = letters.trim();
      const wordsplit = wordstrim.split(' ')
      const firstword = wordsplit[0] + (wordsplit[1] || ''); 
      const endword = wordsplit[wordsplit.length - 1];
      setMain(`${firstword} , ${endword}`)
      console.log(placeList)
    } else {
      setText(true)
    }
  }, [placeList])


  return (
    <View>
      {mapRegion
        ? <MapView
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height * 0.89,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion || {
            latitude: 24.8607,
            longitude: 67.0011,
            latitudeDelta: 0.0542,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            title="You"
            coordinate={mapRegion || {
              latitude: 24.8607,
              longitude: 67.0011,
              latitudeDelta: 0.0542,
              longitudeDelta: 0.0421
            }}
          />
          {placeList && placeList.length > 0 && (
            <Marker
              title={placeList[0]?.name ?? "Place"}
              coordinate={{
                latitude: parseFloat(placeList[0]?.lat) ?? 24.8607,
                longitude: parseFloat(placeList[0]?.lon) ?? 67.0011,
              }}
            />
          )}


        </MapView> : null}
      <TouchableOpacity
        style={styles.locateButton}
        onPress={requestLocation}
      >
        <Image
          source={locationimage}
          style={styles.locateButtonText} />
      </TouchableOpacity>
      {text ? (
        <Text style={styles.locateText}>Place not found!</Text>
      ) : main ? (
        <Text style={styles.locateText}>{main}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  locateButton: {
    position: 'absolute',
    top: 13, // Distance from the bottom
    right: 60, // Align to the right
    backgroundColor: '#FFF6E9',
    paddingVertical: 8,
    paddingHorizontal: 10,
    zIndex: 40,
    // borderRadius: 20,
  },
  locateText: {
    position: 'absolute',
    top: 160, // Distance from the bottom
    right: 30, // Align to the right
    backgroundColor: '#FFF6E9',
    paddingVertical: 8,
    padding: 4,
    paddingHorizontal: 10,
    zIndex: 40,
  },
  locateButtonText: {
    width: 20,
    height: 20,
    objectFit: 'cover'
  },
})
