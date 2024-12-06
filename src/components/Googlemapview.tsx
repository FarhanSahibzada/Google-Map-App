import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

export default function Googlemapview() {
  return (
    <View style={{marginTop : 20   }}>
      <MapView  
      style={{width : 400 , height : 300}}
      />
    </View>
  )
}