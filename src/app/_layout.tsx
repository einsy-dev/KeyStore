import "@/assets/css/global.css";
import store from "@/lib/store";
import { SessionProvider, useSession } from "@/shared/hooks";
import { Header } from "@/widgets/header";
import { Menu } from "@/widgets/Menu";
import { Modal } from "@/widgets/Modal";
import { Popup } from "@/widgets/Popup";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <SessionProvider>
          <SafeAreaView className="flex-1">
            <Router />
            <Modal />
            <Popup />
            <Menu />
          </SafeAreaView>
        </SessionProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

function Router() {
  const { isAuth } = useSession();
  StatusBar.setHidden(true);
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
