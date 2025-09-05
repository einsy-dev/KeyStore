import "@/assets/css/global.css";
import store from "@/lib/store";
import { SessionProvider, useSession } from "@/shared/hooks";
import { Menu } from "@/widgets/Menu";
import { Modal } from "@/widgets/Modal";
import { Popup } from "@/widgets/Popup";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 app">
        <GestureHandlerRootView>
          <StatusBar />
          <Provider store={store}>
            <SessionProvider>
              <Router />
              <Modal />
              <Popup />
              <Menu />
            </SessionProvider>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Router() {
  const { isAuth } = useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuth}>
        <Stack.Screen name="(pages)/main" />
        <Stack.Screen name="(pages)/settings" />
        <Stack.Screen name="(pages)/[groupId]/index" />
        <Stack.Screen name="(pages)/[groupId]/[keyId]" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(pages)/sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
