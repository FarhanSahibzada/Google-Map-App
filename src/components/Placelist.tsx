import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Placelistitem from './Placelistitem'
import { useRouter } from 'expo-router'

type placelistpropss = any


export default function Placelist({ placelistprops }: placelistpropss) {
   
    const router = useRouter()
    const handleonpress = (value : any)=>{
        router.push({ pathname:'/(Modal)/ShowBussiness' , 
            params: {item : JSON.stringify(value)}
        })
    }

    return (
        <View>
            <Text
                style={{ fontSize: 20, fontFamily: 'raleway-bold', marginTop: 10  }}
            >Found {placelistprops.length} Places</Text>

            <FlatList
            style={{paddingBottom : 20}}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={placelistprops}
                renderItem={({ item, index }) => (
                    <TouchableOpacity  onPress={()=> handleonpress(item)}> 
                    <Placelistitem place={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}