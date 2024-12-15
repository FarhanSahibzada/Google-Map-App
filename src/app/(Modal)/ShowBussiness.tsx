import { View, Text, Platform, Linking, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Googlemapview from '@/components/Googlemapview';
import { colors, Colorss } from '@/Styles/style';
import { Ionicons } from '@expo/vector-icons'
import ShowbussinessDetail from '@/components/ShowbussinessDetail';
import { useSelector } from 'react-redux';
import { RootState } from '@/Store/Store';
import  Constants  from 'expo-constants';
// import { OPEN_ROUTES_API_KEY } from '@env'

export default function ShowBussiness() {
  const { item } = useLocalSearchParams<{ item: string }>();
  const parsedItem = item ? JSON.parse(item) : null;
  const lat = parsedItem.lat;
  const lng = parsedItem.lon;
  const query = parsedItem.tags["addr:city"] ?? parsedItem.tags["addr:street"] ?? parsedItem.tags["name"] ?? "Unknown Location";
  const [coordinates, setCoordinates] = useState([]);
  const router = useRouter()
  const myLocation = useSelector((state: RootState) => state.Location)
  const API_KEY = Constants.expoConfig?.extra?.OPEN_ROUTES_API_KEY.trim();
  const origin = {
    latitude: myLocation?.latitude,
    longitude: myLocation?.longitude
  }

  useEffect(() => {
    const fetchapiroutes = async () => {
      if (!lat && !lng) {
        Alert.alert(
          "Error",
          "There is a connection please try again",
          [
            {
              text: "Cancel",
              style: "cancel", // Button style
            },
            { text: "OK", onPress: () => router.back() }
          ]
        );
        return
      }

      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.longitude},${origin.latitude}&end=${lng},${lat}`; // Increase radius

      try {
        const response = await fetch(url);
        const data = await response.json();
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
    fetchapiroutes()
  }, [lat , lng , API_KEY])

  
  

  const onDirectionClick = () => {
    const url = Platform.select({
      ios: `maps://?q=${query}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${query}`,
    });
    if (url) {
      Linking.openURL(url).catch((err) => {
        console.log("failed to fetch the urls", err)
      })
    }
  }

  return (
    <ScrollView style={{
      padding: 20, backgroundColor: Colorss.WHITE, flex: 1
      , paddingTop: 60
    }} contentInsetAdjustmentBehavior='automatic'>
      <ShowbussinessDetail
        place={parsedItem}
        onDirectionClick={() => onDirectionClick()}
      />
      
        <Googlemapview placelist={[parsedItem]} routes={coordinates.length > 0 ? coordinates : []} />
  
      <TouchableOpacity
        style={{
          backgroundColor: Colorss.PRIMARY,
          padding: 15,
          alignContent: "center",
          margin: 8,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          paddingBottom: 15,
          marginTop: 20
        }}
        onPress={() => onDirectionClick()}
      >
        <Ionicons name="navigate-circle-outline"
          size={30} color="white" />

        <Text
          style={{
            fontFamily: "raleway-bold",
            textAlign: "center",
            color: Colorss.WHITE,
          }}
        >
          Get Direction on Google Map
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}