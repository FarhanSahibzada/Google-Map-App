import { defaultstyles } from "@/Styles";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function _layout() {
  return (
    <View style={defaultstyles.container} >
        <Stack>
            <Stack.Screen name="index"  options={{headerShown : false}}/>
        </Stack>
    </View>
  )
}