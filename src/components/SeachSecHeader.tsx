import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dimensions , Keyboard } from "react-native";
import { Searchbar } from "react-native-paper";

const { width } = Dimensions.get('screen')

type SearchBarSeachprops = {
    setSearchText: (text : string)=> void,
    searchText: string,
    result: () => void
}

export default function SearchSecHeader({ setSearchText, searchText , result }: SearchBarSeachprops) {

    const handleSearchText = (text: string) => {
        setSearchText(text)
    }
    return (
        <View>
            <View
                style={{
                    display: "flex", 
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems :"center",
                    marginBottom :30 ,
                }}
            >
                <Text style={{ fontFamily: "raleway-bold", fontSize: 30 , fontWeight : '700' , color: '#131010',
                    elevation : 0.7
                 }}>
                    Explore
                </Text>
            </View>
            <View
                style={{
                    marginTop: 5,
                    display : 'flex',
                    justifyContent : "center",
                    alignItems : 'center'
                }}
            >
                <Searchbar
                    placeholder="Search!"
                    style={styles.input}
                    value={searchText}
                    onChangeText={handleSearchText}
                    onIconPress={result}
                    onSubmitEditing={result}
                    returnKeyType='search'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input : {
        width: width * 0.9,
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
       
    }
})