import { Menu } from "@/components/Menu";
import { Modal } from "@/components/Modal";
import { Popup } from "@/components/Popup";
import store from "@/lib/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../assets/css/global.css";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 app">
          <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
          <GestureHandlerRootView className="flex-1 relative ">
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="App" options={{ headerShown: false }} />
              <Stack.Screen
                name="KeyGroupForm"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="KeyForm" options={{ headerShown: false }} />
              <Stack.Screen name="Settings" options={{ headerShown: false }} />
              <Stack.Screen
                name="+not-found"
                options={{ headerShown: false }}
              />
            </Stack>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
      <Menu />
      <Popup />
      <Modal />
    </Provider>
  );
}
