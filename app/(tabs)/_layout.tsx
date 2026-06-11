import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Modal, Pressable, Text } from "react-native";
import 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import '../../global.css';

import { View } from 'react-native';

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

  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerBackVisible: false,
            headerRight: () => (
              <View style={{ flexDirection: "row", gap: 10 }}>
                {/* Refresh button (optional) */}
                <Pressable onPress={() => console.log("refresh")}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                  }}>

                  <Ionicons name="sync-sharp" size={18} color="#333" />

                </Pressable>

                {/* Profile button */}
                <Pressable onPress={() => setOpen(true)}>
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 17,
                      backgroundColor: "#111",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 12 }}>JC</Text>
                  </View>
                </Pressable>
              </View>
            ),
          }}
        />
      </SafeAreaView>

      {/* Dropdown Modal */}
      <Modal transparent visible={open} animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
          onPress={() => setOpen(false)}
        >
          <View
            style={{
              position: "absolute",
              top: 60,
              right: 10,
              width: 160,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 12,
              elevation: 5,
            }}
          >
            {/* User Info */}
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>John Cruz</Text>
              <Text style={{ color: "gray", fontSize: 12 }}>
                jc@acme.com
              </Text>
            </View>

            {/* Menu Items */}
            <MenuItem icon="grid-outline" label="Dashboard" route="/" onClose={() => setOpen(false)} />
            <MenuItem icon="bulb-outline" label="Tasks" route="/tasks" onClose={() => setOpen(false)} />
            <MenuItem icon="location-outline" label="Maps" route="/maps" onClose={() => setOpen(false)} />
            {/* <MenuItem icon="person-outline" label="login" route="/login" onClose={() => setOpen(false)} /> */}
            {/* <MenuItem icon="notifications-outline" label="Notifications" />
            <MenuItem icon="settings-outline" label="Settings" /> */}

            <View style={{ height: 10 }} />

            {/* <MenuItem icon="help-circle-outline" label="Help & Support" /> */}

            <Pressable
              onPress={() => router.push("/login")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Ionicons name="log-out-outline" size={18} color="red" />
              <Text style={{ marginLeft: 10, color: "red" }}>
                Sign out
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>

  );

}

function MenuItem({ icon, label, route, onClose }: any) {
  const router = useRouter();

  const handlePress = () => {
    onClose?.();
    router.push(route);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Ionicons name={icon} size={18} color="#333" />
      <Text style={{ marginLeft: 10 }}>{label}</Text>
    </Pressable>
  );
}