import { ContextMenu, CopiedPopup } from "@/components/widgets";
import { setModal, setPopup } from "@/lib/store/app";
import { deleteKey } from "@/lib/store/data";
import { Text, View } from "@/shared";
import * as Clipboard from "expo-clipboard";
import { ClipboardCheck, Clipboard as Copy } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

export function Item({
  introId,
  introKey
}: {
  introId: number;
  introKey: KeyI;
}) {
  const [copyState, setCopyState] = useState(false);
  const dispatch = useDispatch();

  const Icon = copyState ? ClipboardCheck : Copy;

  const { colorScheme } = useColorScheme();
  const menu = [
    {
      name: "Edit",
      callback: () => {
        dispatch(
          setModal({
            active: true
            // data: { name: introKey.name, value: introKey.value },
            // onSubmit: (newKey) => {
            //   dispatch(
            //     updateKey({ introId, keyId: introKey.id!, keyData: newKey })
            //   );
            //   dispatch(setModal({ active: false }));
            // }
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
      onPress={() => {
        copy(introKey.value);
        setCopyState(true);
        setTimeout(() => {
          setCopyState(false);
        }, 3500);
        dispatch(
          setPopup({
            active: true,
            component: <CopiedPopup />,
            position: "top"
          })
        );
      }}
      onLongPress={() =>
        dispatch(
          setModal({
            active: true,
            component: <ContextMenu name="" menu={menu} />
          })
        )
      }
    >
      <View className="intro_item_v flex flex-row justify-between items-center px-6 py-3 mb-1 rounded-3xl">
        <Text className="intro_item_t text-3xl w-80" numberOfLines={1}>
          {introKey.name}
        </Text>
        <Icon color={colorScheme === "light" ? "black" : "white"} />
      </View>
    </TouchableOpacity>
  );
}

async function copy(text: string) {
  await Clipboard.setStringAsync(text);
}
