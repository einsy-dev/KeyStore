import { setModal } from "@/lib/store/app";
import { Button } from "@/shared/ui";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";

interface ConfirmI {
  title: string;
  onSubmit: () => void;
  onReject?: () => void;
}

export function Confirm({ title, onSubmit, onReject = () => "" }: ConfirmI) {
  const dispatch = useDispatch();
  return (
    <View className="card rounded-xl p-4 gap-2">
      <Text className="text text-2xl text-center mb-4">{title}</Text>
      <View className="flex-row justify-evenly gap-4">
        <Button
          onPress={async () => {
            await onReject();
            dispatch(setModal({ active: false }));
          }}
        >
          Cancel
        </Button>
        <Button
          onPress={async () => {
            await onSubmit();
            dispatch(setModal({ active: false }));
          }}
        >
          Confirm
        </Button>
      </View>
    </View>
  );
}
