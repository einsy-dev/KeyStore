import "@/assets/css/global.css";
import { ConfigProvider, SessionProvider, useSession } from "@/lib/providers";
import store from "@/lib/store";
import { useColor } from "@/shared/hooks";
import { ContextMenu } from "@/widgets/context-menu";
import { Header } from "@/widgets/header";
import { Modal } from "@/widgets/modal";
import { Popup } from "@/widgets/popup";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function Layout() {
  const { colorScheme } = useColor();
  return (
    <Providers>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <SafeAreaView className="app flex-1 relative">
        <Router />
        <Popup />
      </SafeAreaView>
      <Modal />
      <ContextMenu />
    </Providers>
  );
}

function Router() {
  const { isAuth } = useSession();
  return (
    <Stack screenOptions={{ header: () => <Header />, animation: "fade" }}>
      <Stack.Protected guard={isAuth}>
        <Stack.Screen name="(pages)/main" />
        <Stack.Screen name="modal/mainEdit" options={{ presentation: "modal" }} />

        <Stack.Screen name="(pages)/[groupId]/index" />
        <Stack.Screen name="(pages)/[groupId]/[keyId]" />
        <Stack.Screen name="(pages)/settings" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(pages)/sign-in" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <SessionProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView>{children}</GestureHandlerRootView>
          </SafeAreaProvider>
        </SessionProvider>
      </ConfigProvider>
    </Provider>
  );
}
