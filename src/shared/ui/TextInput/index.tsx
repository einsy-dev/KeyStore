import { Text, TextInputProps, TextInput as TextInputRN, View } from "react-native";

export function TextInput({ label = "", className = "", ...props }: TextInputProps & { label?: string }) {
  return (
    <View className={"relative min-h-14 border rounded px-4 " + className}>
      <TextInputRN className={`text text-2xl`} {...props} />
      {label && (
        <View className="app absolute -top-4 left-1 px-4">
          <Text className="text">{label}</Text>
        </View>
      )}
    </View>
  );
}
