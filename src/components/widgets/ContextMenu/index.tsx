import { selectContextMenu, setContextMenu } from "@/lib/store/modal";
import { Text, View } from "@/shared";
import { Modal, Pressable, TouchableOpacity } from "react-native";
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
        <View className="m-3 rounded-3xl mt-auto  overflow-hidden p-4 context_menu_v">
          {modal.menu?.map((el: any) => (
            <TouchableOpacity
              key={el.name}
              onPress={() => {
                el.callback();
                dispatch(setContextMenu({ active: false }));
              }}
            >
              <Text className="text-2xl px-4 py-1 context_menu_t">
                {el.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}
