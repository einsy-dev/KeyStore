import { useEffect, useState } from "react";
import { TextInput } from "../TextInput";

export function PassPhraseInput() {
  const [text, setText] = useState("");
  useEffect(() => {
    console.log(text);
  }, [text]);
  return <TextInput onChangeText={setText} />;
}
