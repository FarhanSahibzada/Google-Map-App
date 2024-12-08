import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

export default function Placelistitem({ place }) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                marginTop: 20
            }}
        >
            {/* {place?.photos?  <Image
      source={{uri:
        "https://maps.googleapis.com/maps/api/place/photo" +
        "?maxwidth=400" +
        "&photo_reference=" +
        place?.photos[0]?.photo_reference +
        "&key=<api key>",
      }}
      style={{ width: 110, height: 110, borderRadius: 15 }}
    />:
    <Image source={require('./../../../assets/placeholder.jpg')}
    style={{ width: 110, height: 110, borderRadius: 15 }}
    />} */}
            <View style={{ flex: 1 }}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: 18, marginBottom: 5,
                        fontFamily: "raleway-bold"
                    }}
                >
                    {place.name}
                </Text>
                <Text style={{
                    fontSize: 16,
                    marginBottom: 5,
                    color: '#C1BAA1'
                }}
                    numberOfLines={2}>
                    {place.vicinity}
                </Text>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        flexDirection: "row",
                    }}
                >
                    <AntDesign name="star" size={20} color='#FCC737' />
                    <Text>{place.rating}</Text>
                </View>

            </View>
            <HorizontalLine />

        </View>
    )
}