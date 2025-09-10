import "@/assets/css/global.css";
import store from "@/lib/store";
import { SessionProvider, useColor, useSession } from "@/shared/hooks";
import { Header } from "@/widgets/header";
import { Menu } from "@/widgets/Menu";
import { Modal } from "@/widgets/Modal";
import { Popup } from "@/widgets/Popup";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function Layout() {
  const { colorScheme } = useColor();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="app flex-1">
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <GestureHandlerRootView>
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
    <Stack screenOptions={{ header: () => <Header /> }}>
      <Stack.Protected guard={isAuth}>
        <Stack.Screen name="(pages)/main" options={{ headerShown: false }} />
        <Stack.Screen name="(pages)/settings" />
        <Stack.Screen name="(pages)/[groupId]/index" />
        <Stack.Screen name="(pages)/[groupId]/[keyId]" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(pages)/sign-in" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
