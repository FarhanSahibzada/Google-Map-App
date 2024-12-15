import { View, Text } from 'react-native'
import React, { useState } from 'react'
import GoogleMapFull from '@/components/GoogleMapFull'
import SearchSecHeader from '@/components/SeachSecHeader'
import GoogleNearbyApi from '@/Services/GoogleNearbyApi'

export default function SearchScreen() {
  const [search, setSearch] = useState('')
  const [place , setPlace ] = useState()

  const handleOnIconPress = () => {
   GoogleNearbyApi.SearchText(search).then((response)=>{
    setPlace(response)
   })
  }

  return (
    <View style={{ paddingTop: 30 }}>
    <View style={{ position: 'absolute', zIndex: 20 , top: 40 , paddingHorizontal : 20 , }}>
      <SearchSecHeader 
        searchText={search} 
        setSearchText={setSearch} 
        result={handleOnIconPress} 
      />
    </View>
    <GoogleMapFull placeList={place} />
  </View>
  )
}