import { StyleSheet } from "react-native";
import { colors } from "./style";

export const  defaultstyles = StyleSheet.create ({
    container : {
        flex : 1 ,
        backgroundColor : colors.background
    },
    rowcontainer : {
        display : 'flex' ,
        justifyContent : 'space-around' ,
        alignItems : 'center',
        flexDirection : 'row'
    }
})