import * as Clipboard from "expo-clipboard";
import { ClipboardCheck, Copy } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export function CopyText({
  children,
  onCopy = () => {}
}: {
  children: string;
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
      <View className="flex flex-row gap-2 ">
        <Text>{children}</Text>
        <Icon color={colorScheme === "light" ? "black" : "white"} />
      </View>
    </Pressable>
  );
}

async function copy(text: string) {
  await Clipboard.setStringAsync(text);
}
