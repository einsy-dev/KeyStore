import { Button, Text, TextInput, View } from "@/components/shared";
import { decrypt, encrypt } from "@/lib/crypto";
import { selectData, setData } from "@/lib/store/data";
import { readFile, saveFile, shareFile } from "@/utils";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { TextInputComponent } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Backup() {
  const [password, setPassword] = useState("");
  const data = useSelector(selectData);
  const dispatch = useDispatch();
  const router = useRouter();
  const ref = useRef<TextInputComponent & { focus: () => void }>(null);

  return (
    <View className="app flex-1 gap-4 p-4 ">
      <View>
        <Text>Password</Text>
        <TextInput ref={ref} onChangeText={setPassword} value={password} />
      </View>
      <View className="gap-2 mt-auto">
        <Button
          className="p-4"
          onPress={async () => {
            if (!password) return ref.current?.focus();
            const file = await readFile();
            dispatch(setData(JSON.parse(decrypt(file, password))));
            router.navigate("/App");
          }}
        >
          Import
        </Button>
        <Button
          className="p-4"
          onPress={async () => {
            if (!password) return ref.current?.focus();
            await shareFile({
              filename: new Date().toISOString(),
              data: encrypt(JSON.stringify(data), password)
            });
          }}
        >
          Share
        </Button>
        <Button
          className="p-4"
          onPress={async () => {
            if (!password) return ref.current?.focus();
            await saveFile({
              filename: new Date().toISOString(),
              data: encrypt(JSON.stringify(data), password)
            });
          }}
        >
          Download
        </Button>
      </View>
    </View>
  );
}
