import { defaultstyles } from "@/Styles";
import { colors } from "@/Styles/style";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function _layout() {
  return (
    <View style={defaultstyles.container} >
        <Stack>
            <Stack.Screen name="index"  options={{headerShown : false}}/>
            <Stack.Screen name="SignUp"  options={{headerShown : false}}/>
        </Stack>
    </View>
  )
}