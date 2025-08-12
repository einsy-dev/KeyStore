import { createId } from "@paralleldrive/cuid2";
import { Delete } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import { Text, View } from "../shared";

export function Numpad({
  value = "",
  onChangeText = () => ""
}: {
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  const { colorScheme } = useColorScheme();
  const [, setState] = useState<string[]>(value.split(""));
  const color = colorScheme === "light" ? "black" : "white";

  return (
    <View className="w-3/4 mx-auto">
      <NumpadLine
        items={["1", "2", "3"]}
        setState={setState}
        onChangeText={onChangeText}
      />
      <NumpadLine
        items={["4", "5", "6"]}
        setState={setState}
        onChangeText={onChangeText}
      />
      <NumpadLine
        items={["7", "8", "9"]}
        setState={setState}
        onChangeText={onChangeText}
      />
      <NumpadLine
        items={["", "0", <Delete key={"Delete"} color={color} />]}
        setState={setState}
      />
    </View>
  );
}

function NumpadLine({
  items = [],
  setState,
  onChangeText = () => {}
}: {
  items: string[] | ReactNode[];
  setState: Dispatch<SetStateAction<string[]>>;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View className=" flex-row justify-between">
      {items.map((el) =>
        typeof el == "string" ? ( //only one "react Node"
          <TextItem
            key={createId()}
            item={el}
            onPress={() =>
              setState((prev: string[]) => {
                prev.push(el);
                onChangeText(prev.join(""));
                return prev;
              })
            }
          />
        ) : (
          <IconItem
            key={createId()}
            item={el}
            onPress={() => {
              setState((prev: string[]) => {
                prev = prev.slice(0, prev.length - 1);
                onChangeText(prev.join(""));
                return prev;
              });
            }}
          />
        )
      )}
    </View>
  );
}

function TextItem({
  item,
  onPress
}: {
  item: string;
  onPress: (item: string) => void;
}) {
  return (
    <TouchableNativeFeedback
      onPress={() => onPress(item)}
      key={createId()}
      background={TouchableNativeFeedback.Ripple("hsl(0, 0%, 50%)", false, 42)}
    >
      <View className=" h-24 aspect-square rounded-full items-center justify-center">
        <Text className="text-3xl">{item}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

function IconItem({ item, onPress }: { item: ReactNode; onPress: () => void }) {
  return (
    <TouchableNativeFeedback
      onPress={() => onPress()}
      key={createId()}
      background={TouchableNativeFeedback.Ripple("hsl(0, 0%, 50%)", false, 42)}
    >
      <View className=" h-24 aspect-square rounded-full items-center justify-center">
        {item}
      </View>
    </TouchableNativeFeedback>
  );
}
