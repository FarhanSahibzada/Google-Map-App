import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Header } from '@/components/Header'
import Googlemapview from '@/components/Googlemapview'

export default function Home() {
  const [search , setSearch] = useState('')

  return (
    <View>
      <Header placeholder='Search location!' searchText={search} setSearchText={setSearch} />
      <Googlemapview />
    </View>
  )
}