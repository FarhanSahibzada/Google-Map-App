import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as Paperprovider } from 'react-native-paper';
import { Provider } from 'react-redux';
import  Store  from '@/Store/Store';
import { useFonts } from 'expo-font';

export const Rootnavigation = () => {

  return (
    <Stack>    
      <Stack.Screen name='(authScreen)' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='(Modal)/ShowBussiness' options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: 'white',
					},
          gestureEnabled: true  ,
          headerShown : false
				}} />
    </Stack>
  )
}


export default function App() {
  const [loaded, error] = useFonts({
    'railway': require('@/assets/fonts/Raleway-Regular.ttf'),
    'railway-bold': require('@/assets/fonts/Raleway-SemiBold.ttf'),
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={Store}>
          <Paperprovider>

            <Rootnavigation />

            <StatusBar style='auto' />
          </Paperprovider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider >
  );
}

