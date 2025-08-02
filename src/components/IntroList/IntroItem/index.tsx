import { Confirm, ContextMenu, CopiedPopup, Form } from "@/components/widgets";
import { setModal, setPopup } from "@/lib/store/app";
import { deleteKey, updateKey } from "@/lib/store/data";
import { Text, View } from "@/shared";
import * as Clipboard from "expo-clipboard";
import {
  Apple,
  ClipboardCheck,
  Clipboard as Copy,
  Ellipsis
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ReactNode, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

export function IntroItem({
  introId,
  introKey
}: {
  introId: number;
  introKey: KeyI;
}) {
  const dispatch = useDispatch();

  const { colorScheme } = useColorScheme();
  const menu = [
    {
      name: "Edit",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <Form
                data={{ name: introKey.name, value: introKey.value }}
                required={{ name: true, value: true }}
                onSubmit={(val: any) => {
                  dispatch(
                    updateKey({ introId, keyId: introKey.id!, keyData: val })
                  );
                  dispatch(setModal({ active: false }));
                }}
              />
            )
          })
        );
      }
    },
    {
      name: "Delete",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <Confirm
                title="Are you sure?"
                onSubmit={() => {
                  dispatch(deleteKey({ introId, keyId: introKey.id! }));
                }}
              />
            )
          })
        );
      }
    }
  ];

  return (
    <TouchableOpacity
      onLongPress={(e) => {
        e.stopPropagation();
        dispatch(
          setModal({
            active: true,
            component: <ContextMenu name="" menu={menu} />,
            position: "bottom"
          })
        );
      }}
    >
      <View className="item flex flex-row justify-between  items-center gap-4 px-4 py-3 mb-1 rounded-2xl">
        <Apple color={colorScheme === "light" ? "black" : "white"} />
        <View className="flex-1 flex-row border-x-0 border-t-0 border">
          <View className="flex-1">
            <CopyItem onCopy={() => copy(introKey.name)}>
              <Text className="item text-2xl" numberOfLines={1}>
                {introKey.name}
              </Text>
            </CopyItem>
            <CopyItem onCopy={() => copy(introKey.value)}>
              <Text className="item text-2xl" numberOfLines={1}>
                {introKey.value}
              </Text>
            </CopyItem>
          </View>
          <Pressable
            onPress={() =>
              dispatch(
                setModal({
                  active: true,
                  component: <ContextMenu name={introKey.name} menu={menu} />,
                  position: "bottom"
                })
              )
            }
            className="p-2"
          >
            <Ellipsis color={colorScheme === "light" ? "black" : "white"} />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function CopyItem({
  children,
  onCopy = () => {}
}: {
  children: ReactNode;
  onCopy: () => void;
}) {
  const [copyState, setCopyState] = useState(false);
  const Icon = copyState ? ClipboardCheck : Copy;
  const dispatch = useDispatch();
  const { colorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={() => {
        onCopy();
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
    >
      <View className="flex flex-row gap-2 ">
        {children}
        <Icon color={colorScheme === "light" ? "black" : "white"} />
      </View>
    </Pressable>
  );
}

async function copy(text: string) {
  await Clipboard.setStringAsync(text);
}
