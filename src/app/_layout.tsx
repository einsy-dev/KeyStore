import "@/assets/css/global.css";
import store from "@/lib/store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Router />
      </Provider>
    </GestureHandlerRootView>
  );
}

function Router() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(pages)/main" />
      <Stack.Screen name="(pages)/sign-in" />
    </Stack>
  );
}
