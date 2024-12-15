import { Tabs } from "expo-router";
import { Entypo, FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { colors, fontSize } from "@/Styles/style";

export default function TabNavigationt() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarLabelStyle: {
                        fontSize: fontSize.xxs,
                        fontWeight: '700',
                    },
                    tabBarStyle: {
                        position: 'absolute',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderTopWidth: 0,
                        paddingTop: 1,
                        paddingBottom: 2,
                        
                    }
                }}
            >
                <Tabs.Screen name="(Home)" options={{ title: 'Home', tabBarIcon: ({ color }) => <Entypo name="home" size={20} color={color} /> }} />

                <Tabs.Screen name="Search" options={{ title: 'Explore', tabBarIcon: ({ color }) => <Ionicons name="search" size={20} color={color} /> }} />

                {/* <Tabs.Screen name="Favourite" options={{ title: 'Favourite', tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} /> }} /> */} 

                <Tabs.Screen name="Profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <FontAwesome6 name="user" size={20} color={color} /> }} /> 

            </Tabs>
        </>
    )
}