import { setModal } from "@/lib/store/app";
import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";

interface ConfirmI {
  title: string;
  onSubmit: () => void;
  onReject?: () => void;
}

export function Confirm({ title, onSubmit, onReject = () => "" }: ConfirmI) {
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={(e) => e.stopPropagation()}
      className="p-4 border rounded-3xl overflow-hidden justify-between modal"
    >
      <Text className="item text-2xl text-center mb-4">{title}</Text>
      <View className="flex-row justify-evenly">
        <Pressable
          onPress={() => {
            onReject();
            dispatch(setModal({ active: false }));
          }}
        >
          <Text className="btn border item rounded-2xl px-10 py-2">
            Reject
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            onSubmit();
            dispatch(setModal({ active: false }));
          }}
        >
          <Text className="btn border item rounded-2xl px-10 py-2">
            Submit
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
