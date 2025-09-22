import { useConfig } from "@/lib/providers";
import { setModal } from "@/lib/store/app";
import { useColor } from "@/shared/hooks";
import { Circle, CircleSmall } from "lucide-react-native";

import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";

// dispatch modal
export function ChangeTheme() {
  const { t } = useConfig();
  const dispatch = useDispatch();
  function handlePress() {
    dispatch(setModal({ active: true, component: <ThemeModal /> }));
  }

  return (
    <View className="">
      <Pressable onPress={handlePress}>
        <Text className="text text-xl">{t("settings.apperance")}</Text>
      </Pressable>
    </View>
  );
}

function ThemeModal() {
  const { theme, setConfig } = useConfig();
  const { color } = useColor();
  return (
    <View className="card p-4 w-5/6 rounded gap-4 self-center">
      {["system", "light", "dark"].map((th) => (
        <Pressable key={th} onPress={() => setConfig("theme", th as any)}>
          <View className="flex-row h-[30px] items-center">
            <Text className="text text-xl flex-1">{th}</Text>
            <View className="relative h-full w-[30px]">
              <View className="absolute right-0">
                <Circle size={30} stroke={color} />
              </View>
              {theme === th && (
                <View className="absolute right-0">
                  <CircleSmall size={30} fill={color} stroke={color} />
                </View>
              )}
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
