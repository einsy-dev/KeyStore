import "@/assets/css/global.css";
import store from "@/lib/store";
import { SessionProvider, useSession } from "@/shared/hooks/useSession";
import { View } from "@/shared/ui";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <SessionProvider>
          <StatusBar hidden />
          <View className="flex-1 p-6">
            <StackRouter />
          </View>
          {/* <Menu /> */}
          {/* <Popup /> */}
          {/* <Modal /> */}
        </SessionProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

function StackRouter() {
  const session = useSession();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="+not-found" />

      <Stack.Protected guard={!session.isAuth}>
        <Stack.Screen name="(pages)/sign-in" />
      </Stack.Protected>

      {/* <Stack.Protected guard={session.isAuth}>
        <Stack.Screen name="(pages)/main" />
      </Stack.Protected> */}
    </Stack>
  );
}
