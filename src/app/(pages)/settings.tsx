import { useConfig, useSession } from "@/shared/hooks";
import { Toggle } from "@/shared/ui";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  const { colorScheme } = useColorScheme();
  const { signOut } = useSession();
  const { set } = useConfig();

  return (
    <View className="flex-1 app p-4 gap-4">
      <Link
        title="Change Pin"
        cb={() => {
          SecureStore.setItem("pin", "");
          signOut();
        }}
      />

      <View className="flex-row justify-between items-center">
        <Text className="text text-xl">Change Theme</Text>
        <Toggle
          active={colorScheme === "light"}
          setActive={(isActive) => {
            set("theme", isActive ? "light" : "dark");
          }}
        />
      </View>

      <View className="border border-t-0 border-x-0">
        <Text className="text text-2xl">Backup</Text>
      </View>

      <Link title="Import Backup" cb={() => {}} />
      <Link title="Export Backup" cb={() => {}} />
      <Link title="Download Backup" cb={() => {}} />

      <View className="mt-auto">
        <Text className="text text-center">{process.env.EXPO_PUBLIC_SECRET || "no env"}</Text>
      </View>
    </View>
  );
}

function Link({ title, cb }: { title: string; cb: () => void }) {
  return (
    <Pressable onPress={() => cb()}>
      <Text className="text text-xl py-2">{title}</Text>
    </Pressable>
  );
}
