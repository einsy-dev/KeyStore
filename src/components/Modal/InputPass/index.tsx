import {
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View
} from "@/components/shared";
import { setModal } from "@/lib/store/app";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface InputPasswordI {
  onSubmit: (password: string) => void;
  title: string;
}

export function InputPassword({ onSubmit, title }: InputPasswordI) {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView className="flex-1">
      <View className="flex-1 justify-center">
        <View className="item p-4 gap-2">
          <Text className="text-center">Password</Text>
          <TextInput onChangeText={setPassword} value={password} />
          <Button
            onPress={async () => {
              if (!password.trim()) return;
              await onSubmit(password.trim());
              dispatch(setModal({ active: false }));
            }}
            className="mt-auto"
          >
            {title}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
