import { selectContextMenu, setContextMenu } from "@/lib/store/modal";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function ContextMenu() {
  const modal = useSelector(selectContextMenu);
  const dispatch = useDispatch();

  return (
    <Modal
      onRequestClose={() => dispatch(setContextMenu({ active: false }))}
      animationType="slide"
      visible={modal.active}
      transparent
    >
      <Pressable
        className="flex-1"
        onPress={() => {
          dispatch(setContextMenu({ active: false }));
        }}
      >
        <View className=" m-2 mt-auto border-2 rounded-2xl overflow-hidden p-4 bg-white">
          {modal.menu?.map((el: any) => (
            <TouchableOpacity
              key={el.name}
              onPress={() => {
                el.callback();
                dispatch(setContextMenu({ active: false }));
              }}
            >
              <Text className="text-2xl px-4 py-1">{el.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}
