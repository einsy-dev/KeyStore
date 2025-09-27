import { Text, TextInputProps, TextInput as TextInputRN, View } from "react-native";

export function TextInput({ label = "", className = "", ...props }: TextInputProps & { label?: string }) {
  return (
    <View className={`relative py-2.5 ${className}`}>
      <TextInputRN className="text text-2xl border rounded px-4 py-2" {...props} />
      {label && (
        <View className="app absolute top-0 left-2 px-2 bg-inherit">
          <Text className="text">{label}</Text>
        </View>
      )}
    </View>
  );
}
