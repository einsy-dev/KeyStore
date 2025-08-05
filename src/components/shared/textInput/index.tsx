import { useState } from "react";
import { TextInput as TextInputRN } from "react-native";

export function TextInput({
  onChangeText
}: {
  onChangeText: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <TextInputRN
      value={value}
      onChangeText={(text: string) => {
        setValue(text);
        onChangeText(text);
      }}
      className="border px-4 py-2 rounded text-2xl  item"
    />
  );
}
