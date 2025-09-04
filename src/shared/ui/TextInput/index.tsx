import { Ref } from "react";
import { KeyboardType, TextInput as TextInputRN } from "react-native";

export function TextInput({
  value = "",
  className = "",
  onChangeText,
  ref = null,
  keyboardType = "default",
  placeholder = "",
  placeholderClassName = ""
}: {
  value?: string;
  className?: string;
  onChangeText: (text: string) => void;
  ref?: Ref<any>;
  keyboardType?: KeyboardType;
  placeholder?: string;
  placeholderClassName?: string;
}) {
  return (
    <TextInputRN
      ref={ref}
      value={value}
      onChangeText={(text: string) => {
        onChangeText(text);
      }}
      keyboardType={keyboardType}
      className={`border px-4 py-2 rounded text-2xl item ${className}`}
      placeholder={placeholder}
      placeholderClassName={placeholderClassName}
    />
  );
}
