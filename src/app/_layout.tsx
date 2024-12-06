import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as Paperprovider } from 'react-native-paper';

export const Rootnavigation = ()=>{
  return (
    <Stack>
      <Stack.Screen  name='(tabs)' options={{headerShown : false}}/>
    </Stack>
  )
}




export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex : 1}}>
        <Paperprovider>
        <Rootnavigation/>

        <StatusBar  style='auto'/>
        </Paperprovider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

