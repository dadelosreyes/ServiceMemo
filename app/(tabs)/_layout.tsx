import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../../global.css';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Tabs } from 'expo-router';

import { TouchableHighlight, View } from 'react-native';


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Hide the splash screen after fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Keep showing splash screen while loading
    return null;
  }

  return (

    <Tabs
      screenOptions={{
        headerShown: true,
        headerLeft: () => null,
        //headerTitle: '',
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: '#919191',
        headerRight: () => (

          <View style={{ flexDirection: 'row', marginRight: 10, gap: 8 }}>
            <TouchableHighlight underlayColor="#cecece" onPress={() => console.log('refresh')}
              style={{
                padding: 6,
                borderWidth: 1,
                borderColor: '#919191',
                borderRadius: 6,
              }} >
              <Feather name="refresh-ccw" size={17} color="black" />
            </TouchableHighlight>

            <TouchableHighlight underlayColor="#cecece" onPress={() => console.log('user')}
              style={{
                padding: 6,
                borderWidth: 1,
                borderColor: '#919191',
                //backgroundColor: 'black',
                borderRadius: 6,
              }} >
              <Ionicons name="person" size={17} color="black" />
            </TouchableHighlight>
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <FontAwesome5 name="tasks" size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color }) => <FontAwesome6 name="location-dot" size={20} color={color} />
        }}
      />
    </Tabs>

    /* 
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <UIThemeProvider>
            <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </UIThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
    */
  );

}