import "@/assets/css/global.css";
import store from "@/lib/store";
import { SessionProvider, useSession } from "@/shared/hooks";
import { Menu } from "@/widgets/Menu";
import { Modal } from "@/widgets/Modal";
import { Popup } from "@/widgets/Popup";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function Layout() {
  return (
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
  );
}

function Router() {
  const { isAuth } = useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(pages)/sign-in" />
      </Stack.Protected>

      <Stack.Protected guard={isAuth}>
        <Stack.Screen name="(pages)/main" />
      </Stack.Protected>
    </Stack>
  );
}
