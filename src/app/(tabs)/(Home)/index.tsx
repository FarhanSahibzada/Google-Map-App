import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Header } from '@/components/Header'
import Googlemapview from '@/components/Googlemapview'
import CategoryList, { Category } from '@/components/Categorylist'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/Store'
import { useHeaderHeight } from '@react-navigation/elements'
import GoogleNearbyApi from '@/Services/GoogleNearbyApi'

export default function Home() {
  const [search , setSearch] = useState('')
  const [place , setPlace] = useState([])
  const locationdata = useSelector((state : RootState)=> state.Location)
  const headerheight = useHeaderHeight()

  const NearBySearch = (value : Category)=> {
    if (locationdata?.latitude && locationdata.longitude) {
    GoogleNearbyApi.nearByPlace(locationdata.latitude , locationdata.longitude , value.value)
    .then((res)=>
     // setPlace(res.elements)
      console.log("response ==> " ,res.elements)
    )
  }}

  return (
    <View style={{justifyContent : 'center' , alignItems : 'center' , paddingTop: 180}}>
      <Header placeholder='Search location!' searchText={search} setSearchText={setSearch} />
      <Googlemapview  />
      <CategoryList setSelectedCategory={(value)=> NearBySearch(value)} />
    </View>
  )
}