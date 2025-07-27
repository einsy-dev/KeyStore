import { Pressable, Text, View } from "react-native";

interface ConfirmI {
  title: string;
  onSubmit: () => void;
  onReject?: () => void;
}

export function Confirm({ title, onSubmit, onReject = () => "" }: ConfirmI) {
  return (
    <Pressable
      onPress={(e) => e.stopPropagation()}
      className="p-4 border rounded-3xl overflow-hidden justify-between modal"
    >
      <Text className="modal_t text-2xl text-center mb-4">{title}</Text>
      <View className="flex-row justify-evenly">
        <Pressable onPress={() => onReject()}>
          <Text className="modal_t modal_btn rounded-2xl px-10 py-2">
            Reject
          </Text>
        </Pressable>
        <Pressable onPress={() => onSubmit()}>
          <Text className="modal_t modal_btn rounded-2xl px-10 py-2">
            Submit
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
