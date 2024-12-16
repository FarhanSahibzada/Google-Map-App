import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import GoogleMapFull from '@/components/GoogleMapFull'
import SearchSecHeader from '@/components/SeachSecHeader'
import GoogleNearbyApi from '@/Services/GoogleNearbyApi'
import Constants from 'expo-constants'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/Store'

export default function SearchScreen() {
  const [search, setSearch] = useState('')
  const [place, setPlace] = useState<any>()
  const API_KEY = Constants.expoConfig?.extra?.OPEN_ROUTES_API_KEY.trim();
  const myLocation = useSelector((state: RootState) => state.Location)
  const origin = {
    latitude: myLocation?.latitude,
    longitude: myLocation?.longitude
  }
  const [coordinates, setCoordinates] = useState('')

  const handleOnIconPress = () => {
    GoogleNearbyApi.SearchText(search).then(async (response) => {
      setPlace(response)
      if (response) { 
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.longitude},${origin.latitude}&end=${response[0]?.lon},${response[0]?.lat}`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          if (data.features.length) {
            const route = data.features[0].geometry.coordinates.map((coord: any) => ({
              latitude: coord[1],
              longitude: coord[0],
            }));
            if (route.length) {
              setCoordinates(route); // Only update coordinates if route exists
            } else {
              Alert.alert("Error", "No route found for the provided coordinates.");
            }
          }
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      }
    })
  }


  return (
    <View style={{ paddingTop: 30 }}>
      <View style={{ position: 'absolute', zIndex: 20, top: 40, paddingHorizontal: 20, }}>
        <SearchSecHeader
          searchText={search}
          setSearchText={setSearch}
          result={handleOnIconPress}
        />
      </View>
      <GoogleMapFull placeList={place} route={coordinates}  />
    </View>
  )
}