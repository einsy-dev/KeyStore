import { deleteKey, updateKey } from "@/lib/store/data";
import { setContextMenu, setModal } from "@/lib/store/modal";
import { Text, View } from "@/shared";
import * as Clipboard from "expo-clipboard";
import { Clipboard as Copy } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

export function Item({
  introId,
  introKey,
  className = ""
}: {
  introId: number;
  introKey: KeyI;
  className?: string;
}) {
  const dispatch = useDispatch();
  const { colorScheme } = useColorScheme();

  const menu: ContextMenuItemI[] = [
    {
      name: "Edit",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            data: { name: introKey.name, value: introKey.value },
            onSubmit: (newKey) => {
              dispatch(
                updateKey({ introId, keyId: introKey.id!, keyData: newKey })
              );
            }
          })
        );
      }
    },
    {
      name: "Delete",
      callback: () => {
        dispatch(deleteKey({ introId, keyId: introKey.id! }));
      }
    }
  ];

  return (
    <TouchableOpacity
      onPress={() => copy(introKey.value)}
      onLongPress={() => dispatch(setContextMenu({ active: true, menu }))}
    >
      <View className="intro_item_v flex flex-row justify-between items-center px-8 py-2 mb-1 rounded-2xl">
        <Text className="intro_item_t text-3xl">{introKey.name}</Text>
        <Copy color={colorScheme === "light" ? "black" : "white"} />
      </View>
    </TouchableOpacity>
  );
}

async function copy(text: string) {
  await Clipboard.setStringAsync(text);
}
