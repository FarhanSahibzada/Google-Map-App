import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

type itemprops = any


export default function PlaceMarker({item} : itemprops ) {
     const name = item.tags["name:en"] ?? item.tags["name"] ?? item.tags["nameEn"] ?? "unknown"
    return (
    <Marker 
    title={name}
    coordinate={{
        latitude: item.lat ?? 24.8610298,
        longitude: item.lon ??   67.0011 ,
      }}

    />
    
  )
}