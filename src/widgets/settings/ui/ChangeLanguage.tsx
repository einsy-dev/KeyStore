import { De, Ru, Us } from "@/assets/icons/app";
import { useConfig } from "@/lib/providers";
import { SizeDecorator } from "@/shared/decorators";
import { useState } from "react";
import { Pressable, View } from "react-native";

const data: { [key: string]: IconI } = {
  en: Us,
  de: De,
  ru: Ru
};

export function ChangeLanguage() {
  const { locale, setConfig } = useConfig();
  const [active, setActive] = useState(false);
  const Icon = data[locale || "en"];
  return (
    <View className="px-4 ">
      <Pressable onPress={() => setActive((prev) => !prev)}>
        <Icon width={35} height={35} />
      </Pressable>
      <SizeDecorator
        active={active}
        className="absolute top-full left-0 right-0 z-20 items-center rounded"
        config={{ duration: 100 }}
      >
        {Object.keys(data)
          .filter((key) => key !== (locale || "en"))
          .map((key) => {
            const Icon = data[key];
            return (
              <Pressable
                key={key}
                onPress={() => {
                  setConfig("locale", key as "en" | "ge" | "ru");
                  setActive(false);
                }}
              >
                <Icon width={35} height={35} />
              </Pressable>
            );
          })}
      </SizeDecorator>
    </View>
  );
}
