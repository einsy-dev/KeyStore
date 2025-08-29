import { decrypt, encrypt } from "@/lib/crypto";
import { setModal } from "@/lib/store/app";
import { selectData, setData } from "@/lib/store/data";
import { readFile, saveFile, shareFile } from "@/utils";
import { Download, File, Share } from "lucide-react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, KeyboardAvoidingView, Text, TextInput, View } from "../shared";

export function useBackupMenu() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  return [
    {
      name: "Share",
      icon: Share,
      callback: async () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <InputPassword
                onSubmit={async (password) => {
                  await shareFile({
                    filename: new Date().toISOString(),
                    data: encrypt(JSON.stringify(data), password)
                  });
                }}
              />
            )
          })
        );
      }
    },
    {
      name: "Download",
      icon: Download,
      callback: async () => {
        await saveFile({
          filename: new Date().toISOString(),
          data: encrypt(JSON.stringify(data), "password")
        });
      }
    },
    {
      name: "Import",
      icon: File,
      callback: async () => {
        const file = await readFile();
        dispatch(setData(JSON.parse(decrypt(file, "password"))));
      }
    }
  ];
}

interface InputPasswordI {
  onSubmit: (password: string) => void;
}

function InputPassword({ onSubmit }: InputPasswordI) {
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView className="flex-1">
      <View className="flex-1 justify-center">
        <View className="item p-4 gap-2">
          <Text className="text-center">Password</Text>
          <TextInput onChangeText={setPassword} value={password} />
        </View>
      </View>
      <Button
        onPress={() => {
          onSubmit(password);
        }}
        className="mt-auto"
      >
        Share
      </Button>
    </KeyboardAvoidingView>
  );
}
