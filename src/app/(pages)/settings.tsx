import { useConfig, useSession } from "@/lib/providers";
import { Backup, ChangeTheme, Divider, Link } from "@/widgets/settings";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";

export default function Settings() {
  const { signOut } = useSession();
  const { t } = useConfig();

  return (
    <View className="flex-1 app p-4 gap-4">
      <Link
        title={t("settings.changePin")}
        cb={() => {
          SecureStore.setItem("pin", "");
          signOut();
        }}
      />

      <ChangeTheme />

      <Divider title={t("settings.backup")} />
      <Backup />
    </View>
  );
}
