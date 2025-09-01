import {
	Button,
	KeyboardAvoidingView,
	Text,
	TextInput,
	View
} from "@/components/shared";
import { useState } from "react";

interface InputPasswordI {
  onSubmit: (password: string) => void;
  title: string;
}

export function InputPassword({ onSubmit, title }: InputPasswordI) {
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView className="flex-1">
      <View className="flex-1 justify-center">
        <View className="item p-4 gap-2">
          <Text className="text-center">Password</Text>
          <TextInput onChangeText={setPassword} value={password} />
          <Button
            onPress={() => {
              if (!password.trim()) return;
              onSubmit(password.trim());
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
