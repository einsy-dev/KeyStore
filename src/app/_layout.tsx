import "@/assets/css/global.css";
import store from "@/lib/store";
import { SessionProvider, useColor, useConfig, useSession } from "@/shared/hooks";
import { ContextMenu } from "@/widgets/context-menu";
import { Header } from "@/widgets/header";
import { Modal } from "@/widgets/modal";
import { Popup } from "@/widgets/popup";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function Layout() {
  const { colorScheme } = useColor();
  useConfig();
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Provider store={store}>
          <SessionProvider>
            <SafeAreaView className="app flex-1 relative">
              <Router />
              <Popup />
            </SafeAreaView>
            <Modal />
            <ContextMenu />
          </SessionProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
