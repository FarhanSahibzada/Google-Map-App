import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Placelistitem from './Placelistitem'

export default function Placelist({ placelistprops }) {
    return (
        <View>
            <Text
                style={{ fontSize: 20, fontFamily: 'raleway-bold', marginTop: 10 }}
            >Found {placelistprops.length} Places</Text>

            <FlatList
                data={placelistprops}
                renderItem={({ item, index }) => (
                    <Placelistitem place={item}/>
                )}
            />
        </View>
    )
}