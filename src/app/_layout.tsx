import { AppModal } from "@/components/widgets/AppModal";
import { ConfirmModal } from "@/components/widgets/ConfirmModal";
import { ContextMenu } from "@/components/widgets/ContextMenu";
import { Popup } from "@/components/widgets/Popup";
import store from "@/lib/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../assets/css/global.css";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 app">
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <View className="flex-1 relative">
        <Provider store={store}>
          <Stack>
            <Stack.Screen
              name="(pages)/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
          <ConfirmModal />
          <ContextMenu />
          <AppModal />
          <Popup />
        </Provider>
      </View>
    </SafeAreaView>
  );
}
