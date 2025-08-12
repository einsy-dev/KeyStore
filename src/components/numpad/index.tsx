import { createId } from "@paralleldrive/cuid2";
import { Delete } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { TouchableNativeFeedback } from "react-native";
import { Text, View } from "../shared";

export function Numpad({
  value = "",
  onChangeText = () => ""
}: {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
}) {
  const [state, setState] = useState(value);
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "light" ? "black" : "white";

  useEffect(() => {
    setState((prev) => {
      if (prev.length >= 4) return "";
      return prev;
    });
  }, [value]);

  function handlePress(item: string | number) {
    setState((prev: string) => {
      if (typeof item === "string") {
        return (prev += item);
      } else {
        return prev.slice(0, prev.length - 1);
      }
    });
  }

  useEffect(() => {
    onChangeText(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <View className="w-3/4 mx-auto">
      <NumpadLine items={["1", "2", "3"]} handlePress={handlePress} />
      <NumpadLine items={["4", "5", "6"]} handlePress={handlePress} />
      <NumpadLine items={["7", "8", "9"]} handlePress={handlePress} />
      <NumpadLine
        items={["", "0", <Delete key={"Delete"} color={color} />]}
        handlePress={handlePress}
      />
    </View>
  );
}

function NumpadLine({
  items,
  handlePress
}: {
  items: string[] | ReactNode[];
  handlePress: (item: string | number) => void;
}) {
  return (
    <View className=" flex-row justify-between">
      {items.map((el) =>
        typeof el == "string" ? ( //only one "react Node"
          <TextItem
            key={createId()}
            item={el}
            onPress={() => handlePress(el)}
          />
        ) : (
          <IconItem
            key={createId()}
            item={el}
            onPress={() => handlePress(-1)}
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
