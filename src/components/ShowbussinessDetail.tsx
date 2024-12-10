import { View, Text, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons'
import { Colorss } from '@/Styles/style'
import ShareService from '@/Services/ShareService'

interface ShowBusinessDetailProps {
    place: any; // Define proper type for place if possible
    onDirectionClick: () => void;
}

export default function ShowbussinessDetail({ place, onDirectionClick }: ShowBusinessDetailProps) {
    return (
        <View>
            <Text style={{ fontSize: 26, fontFamily: "raleway-bold" }}>
                {place.tags["name:en"] ?? place.tags["name"]}
            </Text>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 5,
                    flexDirection: "row",
                }}
            >
                <AntDesign name="star" size={24} color={Colorss.YELLOW} />
                <Text style={{ fontSize: 20 }}>5+</Text>
            </View>

            <View style={{ width: '100%', height: 160, justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: Colorss.GRAY, marginTop: 15 }}>
                <MaterialIcons style={{ textAlign: "center" }} name="my-location" size={44} color="#FCC737" />
            </View>

            {(place.tags["addr:city"] || place.tags["addr:street"]) ? (
                <Text
                    style={{ fontSize: 16, marginTop: 10, color: Colorss.DARK_GRAY }}
                    numberOfLines={2}
                >
                    {place.tags["addr:city"] ?? place.tags["addr:street"]}
                </Text>
            ) : null}
            <View style={{
                marginTop: 15, flexDirection: 'row',
                display: 'flex', gap: 10, marginBottom: 15
            }}>
                <TouchableOpacity onPress={() => onDirectionClick()}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: Colorss.GRAY,
                        width: 110,
                        padding: 3,
                        borderRadius: 40,
                        justifyContent: 'center'
                    }}
                >
                    <Ionicons name="navigate-circle-outline" size={24} color="black" />
                    <Text style={{ fontFamily: "raleway", fontSize: 16 }}>Direction</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => ShareService.SharePlace(place)}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: Colorss.GRAY,
                        width: 100,
                        padding: 3,
                        borderRadius: 40,
                        justifyContent: 'center',
                    }}
                >
                    <Feather name="share" size={24} color="black" />
                    <Text style={{ fontFamily: "raleway", fontSize: 16 }}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}