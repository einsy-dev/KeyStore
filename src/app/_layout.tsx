import { AppModal } from "@/components/widgets/AppModal";
import { ContextMenu } from "@/components/widgets/ContextMenu";
import store from "@/lib/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../assets/css/global.css";

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 app">
      <StatusBar />
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(pages)/index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <ContextMenu />
        <AppModal />
      </Provider>
    </SafeAreaView>
  );
}
