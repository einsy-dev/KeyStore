import { setModal } from "@/lib/store/app";
import { Button, KeyboardAvoidingView, TextInput } from "@/shared/ui";
import { useState } from "react";
import { Text, View } from "react-native";
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
        <View className="p-4 gap-2">
          <Text className="text-center">Password</Text>
          <TextInput onChangeText={setPassword} value={password} />
          <Button
            onPress={() => {
              if (!password.trim()) return;
              onSubmit(password.trim());
              setTimeout(() => {
                dispatch(setModal({ active: false }));
              }, 500);
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
