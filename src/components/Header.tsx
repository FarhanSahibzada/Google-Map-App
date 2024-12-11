import { View,  Dimensions, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper'
import locationimage from "@/assets/location.png"
import { defaultstyles } from '@/Styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/Store'

type AndroidSearch = {
    placeholder: string,
    searchText: string,
    setSearchText: (text: string) => void
    result : ()=> void
}

const { width } = Dimensions.get('window')
export const Header = ({ placeholder, searchText, setSearchText  , result}: AndroidSearch) => {
    const handleSearch = (text: string) => {
        setSearchText(text)
    }
    
    

    return (
        <View style={[defaultstyles.rowcontainer, { marginTop: 30, paddingHorizontal: 10 }]}>
            <Image source={locationimage}
                style={styles.image}
            />
            <Searchbar
                placeholder={placeholder}
                onChangeText={handleSearch}
                value={searchText}
                theme={{ colors: { text: '#181C14' } }}
                style={styles.input1}
                iconColor='#181C14'
                rippleColor='#181C14'
                placeholderTextColor="#181C14"
                inputStyle={styles.Searchbar}
                onIconPress={result}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input1: {
        width: width * 0.8,
        height: 50,
        backgroundColor: '#FDF7F4',
        borderColor: '#FDF7F4',
        borderWidth: 1,
        shadowColor: '#F5F7F8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 10,
        justifyContent: 'center',
        paddingVertical: 0,
    },
    Searchbar: {
        color: '#181C14',
        textAlign : 'left',
        textAlignVertical: 'center',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        objectFit: 'cover',
    }

})