//import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
//import { useFonts } from 'expo-font';
import { Tabs } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import 'react-native-reanimated';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import '../../global.css';

import { RefreshProvider, useRefreshContext } from '@/contexts/refreshcontext';
import { useRouter } from 'expo-router';
import { LogBox, View } from 'react-native';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function Header() {
    const router = useRouter();

  // const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  //ignore alert error
  LogBox.ignoreAllLogs(true);

  //refresh button -- animated with alert (error)
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const rotation = useSharedValue(0);
  const { triggerRefresh } = useRefreshContext();

  //refresh spin
  const startSpin = () => {
    rotation.value = 0;
    rotation.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.linear }), -1, false);
  };

  const stopSpin = () => {
    rotation.value = withTiming(0, { duration: 200 });
  };

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    startSpin();

    // runs fetch on active screen
    try {
      await triggerRefresh();
      setRefreshing(false);
      stopSpin();
      Alert.alert("✅ Success!", "SMS Data has been updated.",
        [{
          text: "OK", onPress: () => setRefreshing(false)

        }]);
    }
    catch (err) {
      console.error("refresh failed:", err);
      stopSpin();
      Alert.alert(
        "❌ Refresh Failed!",
        "We couldn't load your tasks right now. Please try again or contact support.",
        [{ text: "OK", onPress: () => setRefreshing(false) }]
      );
    }
  };

  {/* Top Navigation */}
  return (
    <>
      <RefreshProvider>
        <SafeAreaProvider >
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}
            edges={["top", "bottom"]} >
            <View style={styles.header}>

              {/* Page Title */}

              {/* <Image
              source={require('../../assets/images/zmclogo.png')} 
              style={styles.imagelogo}            
            /> */}

              <Text>SMS App</Text>

              <View style={styles.rightContainer}>

                {/* Refresh Button */}
                <TouchableOpacity style={styles.refresh} onPress={handleRefresh} disabled={refreshing}>
                  <Animated.View style={spinStyle}>
                    <Ionicons name="sync-sharp" size={22} color="#374151" />
                  </Animated.View>
                </TouchableOpacity>

                {/* Profile - Avatar */}
                <TouchableOpacity
                  style={styles.avatar}
                  activeOpacity={0.8}
                  onPress={() => setVisible(true)}
                >
                  <Text style={styles.avatarText}>A</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Profile Modal */}
            <Modal
              visible={visible}
              transparent
              animationType="fade"
            >
              <Pressable
                style={styles.overlay}
                onPress={() => setVisible(false)}
              >
                <View style={styles.modal}>

                  {/* <TouchableOpacity style={styles.modalItem} onPress={() => { setVisible(false), console.log("Setting") }}>
                  <Ionicons name="settings-outline" size={20} />
                  <Text style={styles.modalText}>Settings</Text>
                </TouchableOpacity> */}

                  <TouchableOpacity style={styles.modalItem} onPress={() => { setVisible(false), router.push("/login") }}>
                    <Ionicons name="log-out-outline" size={20} />
                    <Text style={styles.modalText}>Logout</Text>
                  </TouchableOpacity>
                  
                </View>
              </Pressable>
            </Modal>
          </SafeAreaView>
        </SafeAreaProvider>
      </RefreshProvider>
    </>
  )
}

// Bottom Navigation 
export default function Layout() {
  return (
    <RefreshProvider>
      <SafeAreaProvider>

        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}
          edges={["top", "bottom"]} >

          <Tabs
            screenOptions={{
              header: () => <Header />,
              tabBarActiveTintColor: "#4B5563",
              tabBarInactiveTintColor: "#9CA3AF",
              tabBarStyle: {
                height: 70,
                paddingBottom: 8,
                paddingTop: 8,
                backgroundColor: "#fff",
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 1.5,
                borderTopColor: "#E5E7EB",
              },
              tabBarLabelStyle: {
                fontSize: 12,
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{

                title: "Dashboard",
                tabBarIcon: ({ color }) => (
                  <Ionicons
                    name="grid-outline"
                    size={22}
                    color={color}
                  />
                ),
              }}
            />

            <Tabs.Screen
              name="tasks"
              options={{
                title: "Tasks",
                tabBarIcon: ({ color }) => (
                  <Ionicons
                    name="briefcase-outline"
                    size={22}
                    color={color}
                  />
                ),
              }}
            />

            <Tabs.Screen
              name="maps"
              options={{
                title: "Maps",
                tabBarIcon: ({ color }) => (
                  <Ionicons
                    name="map-outline"
                    size={22}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs>
        </SafeAreaView>
      </SafeAreaProvider>
    </RefreshProvider>
  );

}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: "#E5E7EB",
  },

  // title: {
  //   fontSize: 22,
  //   fontWeight: "700",
  //   color: "#111827",
  // },

  // imagelogo: {
  //   width: 145,
  //   height: 40,
  // },

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 35,
    height: 35,
    borderRadius: 21,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
  },

  refresh: {
    width: 34,
    height: 34,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  overlay: {
    flex: 1,
  },

  modal: {
    position: "absolute",
    top: 55,
    right: 15,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 6,
  },

  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  modalText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
  },
});

