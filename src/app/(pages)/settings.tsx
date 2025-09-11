import { De, Ru, Us } from "@/assets/icons/app";
import { changeLanguage, i18 } from "@/lib/i18n";
import { useColor, useConfig, useSession } from "@/shared/hooks";
import { Toggle } from "@/shared/ui";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Settings() {
  const { colorScheme } = useColor();
  const { signOut } = useSession();
  const { set } = useConfig();
  return (
    <View className="flex-1 app p-4 gap-4">
      <ChangeLanguage />
      <Link
        title={i18("settings.changePin")}
        cb={() => {
          SecureStore.setItem("pin", "");
          signOut();
        }}
      />

      <Divider title={i18("settings.apperance")} />
      <View className="flex-row justify-between items-center">
        <Text className="text text-xl">{i18("settings.theme")}</Text>
        <Toggle
          active={colorScheme === "light"}
          setActive={(isActive) => {
            set("theme", isActive ? "light" : "dark");
          }}
        />
      </View>
      <Divider title={i18("settings.localization")} />

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

function Divider({ title }: { title: string }) {
  return (
    <View className="border border-t-0 border-x-0">
      <Text className="text text-2xl">{title}</Text>
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

function ChangeLanguage() {
  const { setParams } = useRouter();
  return (
    <View className="flex-row gap-2">
      <Us
        width={50}
        height={50}
        onPress={() => {
          changeLanguage("en");
          setParams({});
        }}
      />
      <De
        width={50}
        height={50}
        onPress={() => {
          changeLanguage("de");
          setParams({});
        }}
      />
      <Ru
        width={50}
        height={50}
        onPress={() => {
          changeLanguage("ru");
          setParams({});
        }}
      />
    </View>
  );
}
