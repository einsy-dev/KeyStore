import { AppModal } from "@/components/widgets/AppModal";
import { ContextMenu } from "@/components/widgets/ContextMenu";
import store from "@/lib/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../assets/css/global.css";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 app">
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
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
