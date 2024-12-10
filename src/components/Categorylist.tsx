import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import CategoryItem from './Categoryitem'

export type Category = {
    id: number;
    name: string;
    value: string;
    icon: any; // Adjust if you have a specific type for the image (e.g., ImageSourcePropType)
};

export type selectcateprops = {
    setSelectedCategory: (category: Category) => void;
}

export default function CategoryList({ setSelectedCategory }: selectcateprops) {
    const categoryList: Category[] = [
        {
            id: 1,
            name: 'Gas Station',
            value: 'fuel',
            icon: require('@/assets/gas.png')
        },
        {
            id: 2,
            name: 'Restaurants',
            value: 'restaurant',
            icon: require('@/assets/food.png')
        },
        {
            id: 3,
            name: 'Hospital',
            value: 'hospital',
            icon: require('@/assets/hospital.png')
        },
    ]
    return (
        <View style={{ marginTop: 15 }}>
            <Text style={{
                fontSize: 20,
                fontFamily: 'raleway-bold',

            }} >Select Top Category</Text>

            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                style={{ marginTop: 3 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedCategory(item)}>
                        <CategoryItem category={item} />
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}