import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import Googlemapview from '@/components/Googlemapview'
import CategoryList, { Category } from '@/components/Categorylist'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/Store'
import { useHeaderHeight } from '@react-navigation/elements'
import GoogleNearbyApi from '@/Services/GoogleNearbyApi'
import Placelist from '@/components/Placelist'

export default function Home() {
  const [search, setSearch] = useState('')
  const [place, setPlace] = useState([])
  const locationdata = useSelector((state: RootState) => state.Location)

 
  const NearBySearch = (value: Category) => {
    if (locationdata?.latitude && locationdata.longitude) {
      GoogleNearbyApi.nearByPlace(locationdata.latitude, locationdata.longitude, value.value)
        .then((res) =>
           setPlace(res.elements)
          //console.log("response ==> ", res.elements)
        )
    }
  }
  const handleiconclick = ()=>{
    if (locationdata?.latitude && locationdata.longitude) {
      GoogleNearbyApi.nearByPlace(locationdata.latitude, locationdata.longitude, search)
        .then((res) =>
           setPlace(res.elements)  
        )
    }else{
      Alert.alert(
        "Alert",
          "Please Find your Location",
          [
            {
              text: "Cancel",
              style: "cancel", // Button style
            },
            { text: "OK" }
          ]
      )
    }
  }



  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom : 90 , }}>
      <Header placeholder='Only search near by places!' searchText={search} setSearchText={setSearch} result={handleiconclick} />
      <ScrollView 
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={false}
      >
      <Googlemapview placelist={place} />
      <CategoryList setSelectedCategory={(value) => NearBySearch(value)} />
      {place ? <Placelist placelistprops={place} /> : null}
      </ScrollView>
    </View>
  )
}