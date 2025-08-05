import * as Clipboard from "expo-clipboard";
import { ClipboardCheck, Copy } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable } from "react-native";
import { Text } from "../text";
import { View } from "../view";

export function CopyText({
  children,
  className,
  onCopy = () => {}
}: {
  children: string;
  className?: string;
  onCopy?: () => void;
}) {
  const [copyState, setCopyState] = useState(false);
  const Icon = copyState ? ClipboardCheck : Copy;
  const { colorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={() => {
        copy(children);
        onCopy();
        setCopyState(true);
        setTimeout(() => {
          setCopyState(false);
        }, 3500);
      }}
    >
      <View className="flex-row gap-2 items-center">
        <Icon height={20} color={colorScheme === "light" ? "black" : "white"} />
        <Text className={className}>{children}</Text>
      </View>
    </Pressable>
  );
}

async function copy(text: string) {
  await Clipboard.setStringAsync(text);
}
