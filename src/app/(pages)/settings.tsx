import { i18 } from "@/lib/i18n";
import { useSession } from "@/lib/providers";
import { ChangeTheme, Divider, Link } from "@/widgets/settings";
import * as SecureStore from "expo-secure-store";
import { Text, View } from "react-native";

export default function Settings() {
  const { signOut } = useSession();

  return (
    <View className="flex-1 app p-4 gap-4">
      <Link
        title={i18("settings.changePin")}
        cb={() => {
          SecureStore.setItem("pin", "");
          signOut();
        }}
      />

      <ChangeTheme />

      <Divider title={i18("settings.backup")} />

      <Link title={i18("settings.importBackUp")} cb={() => {}} />
      <Link title={i18("settings.exportBackUp")} cb={() => {}} />
      <Link title={i18("settings.downloadBackUp")} cb={() => {}} />

      <View className="mt-auto">
        <Text className="text text-center">{process.env.EXPO_PUBLIC_SECRET || "no env"}</Text>
      </View>
    </View>
  );
}
