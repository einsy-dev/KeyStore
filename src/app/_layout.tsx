import { MyContext } from "@/lib/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../assets/css/global.css";

export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar />
      <SafeAreaProvider>
        <MyContext.Provider value={{}}>
          <SafeAreaView className="flex-1">
            <Stack>
              <Stack.Screen
                name="(pages)/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="+not-found"
                options={{ headerShown: false }}
              />
            </Stack>
          </SafeAreaView>
        </MyContext.Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
