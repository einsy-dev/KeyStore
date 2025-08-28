import { Pressable, Text, View } from "react-native";
import { Button } from "../shared";

interface ConfirmI {
  title: string;
  onSubmit: () => void;
  onReject?: () => void;
}

export function Confirm({ title, onSubmit, onReject = () => "" }: ConfirmI) {
  return (
    <Pressable
      onPress={(e) => e.stopPropagation()}
      className="p-4 item overflow-hidden justify-between modal"
    >
      <Text className="item text-2xl text-center mb-4">{title}</Text>
      <View className="flex-row justify-evenly">
        <Button
          onPress={() => {
            onReject();
          }}
        >
          Reject
        </Button>
        <Button
          onPress={() => {
            onSubmit();
          }}
        >
          Submit
        </Button>
      </View>
    </Pressable>
  );
}
