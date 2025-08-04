import store from "@/lib/store";
import { Modal, Popup } from "@/shared";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../assets/css/global.css";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <SafeAreaView className="flex-1 app">
          <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
          <View className="flex-1 relative">
            <Stack>
              <Stack.Screen
                name="(pages)/App"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(pages)/Form"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="+not-found"
                options={{ headerShown: false }}
              />
            </Stack>
          </View>
        </SafeAreaView>
        <Modal />
        <Popup />
      </Provider>
    </GestureHandlerRootView>
  );
}
