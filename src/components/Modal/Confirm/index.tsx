import { Button } from "@/shared";
import { Text, View } from "react-native";

interface ConfirmI {
  title: string;
  onSubmit: () => void;
  onReject?: () => void;
}

export function Confirm({ title, onSubmit, onReject = () => "" }: ConfirmI) {
  return (
    <View className="flex-1 justify-center">
      <View className="item p-4 gap-2">
        <Text className="item text-2xl text-center mb-4">{title}</Text>
        <View className="flex-row justify-evenly">
          <Button
            onPress={() => {
              onReject();
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              onSubmit();
            }}
          >
            Confirm
          </Button>
        </View>
      </View>
    </View>
  );
}
