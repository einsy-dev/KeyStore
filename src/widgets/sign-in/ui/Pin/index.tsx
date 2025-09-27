import { ShakeDecorator } from "@/shared/decorators";
import { Text, View } from "react-native";
import { Item } from "./Item";

export function Pin({ status = null, value }: { status?: "success" | "error" | null; value: string }) {
  return (
    <View className="flex-1 items-center justify-center gap-6">
      <View>
        <Text className="text text-xl">Enter passcode</Text>
      </View>
      <ShakeDecorator
        active={status === "error" ? true : false}
        className="flex-row  items-center justify-center gap-6"
      >
        {Array(4)
          .fill("")
          .map((_, index) => (
            <Item key={index} value={value[index]} status={status} />
          ))}
      </ShakeDecorator>
    </View>
  );
}
