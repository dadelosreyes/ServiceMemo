import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import '../../global.css';

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}
        edges={["top", "bottom"]} >

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
