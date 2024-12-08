import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Category } from './Categorylist'

type categorypros = {
    category: Category
}

export default function Categoryitem({ category }: categorypros) {
    return (
        <View style={styles.icon1}>
            <Image source={category.icon}
                style={{ width: 40, height: 35 }}
            />
            <Text style={{ fontSize: 13, fontFamily: 'raleway' }}>
                {category.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    icon1: {
        padding: 5,
        alignItems: 'center',
        margin: 5,
        width: 95,
        height: 95,
        justifyContent: 'center',
        borderRadius: 15,
    }
})