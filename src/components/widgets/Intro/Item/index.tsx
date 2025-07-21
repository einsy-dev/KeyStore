import { deleteKey, updateKey } from "@/lib/store/data";
import { setContextMenu, setModal } from "@/lib/store/modal";
import * as Clipboard from "expo-clipboard";
import { Pressable, Text } from "react-native";
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
    <Pressable
      onPress={() => copy(introKey.value)}
      onLongPress={() => dispatch(setContextMenu({ active: true, menu }))}
    >
      <Text className={"px-4 py-1 text-3xl border rounded mb-1" + className}>
        {introKey.name}
      </Text>
    </Pressable>
  );
}

async function copy(text: string) {
  await Clipboard.setStringAsync(text);
}
