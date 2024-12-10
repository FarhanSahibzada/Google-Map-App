import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons'

export default function Placelistitem({ place }: any) {
    const name = place.tags["name:en"] ?? place.tags["name"] ?? place.tags["nameEn"] ?? "unknown"
    const address = place.tags["addr:city"] ??  "N/L";
    const street  = place.tags["addr:street"] ??  "";

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                padding: 6,
                marginTop: 10,
                borderRadius: 20,
                width: "100%",
                height: 100,
                backgroundColor: "#F1F0E8",
                elevation: 4,
            }}
        >
            <View style={{ width: 60, height: "100%" , justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                <MaterialIcons style={{ textAlign: "center" }} name="my-location" size={28} color="#FCC737" />
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: 18, marginBottom: 3,
                        fontFamily: "raleway-bold",
                        fontWeight: "600"
                    }}
                >
                    {name}
                </Text>
                <View style={{display : "flex" , alignItems: "center" ,  flexDirection : 'row', marginBottom : 5  }}>
                    <Entypo name="location" size={17} color="#C1BAA1" />
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: '#C1BAA1',
                        marginLeft :6 ,
                    }}
                        numberOfLines={1}>
                        {address} , {street}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        flexDirection: "row",
                    }}
                >
                    <AntDesign name="star" size={20} color='#FCC737' />
                    <Text style={{fontFamily : "railway-bold" , fontWeight : "700" , color:"#FCC737"}}>{
                    place.tags.amenity == "fuel" ? (
                        "Gas-Statiion"
                    ) : place.tags.amenity
                    }</Text>
                </View>

            </View>
            <View>
                <View style={{
                    borderWidth: 0.3,
                    marginTop: 10,
                    borderColor: "#E5E3D4"
                }}></View>
            </View>

        </View>
    )
}