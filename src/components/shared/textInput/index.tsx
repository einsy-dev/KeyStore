import { useState } from "react";
import { TextInput as TextInputRN } from "react-native";

export function TextInput({
  value = "",
  onChangeText
}: {
  value?: string;
  onChangeText: (text: string) => void;
}) {
  const [state, setState] = useState(value);
  return (
    <TextInputRN
      value={state}
      onChangeText={(text: string) => {
        setState(text);
        onChangeText(text);
      }}
      className="border px-4 py-2 rounded text-2xl  item"
    />
  );
}
