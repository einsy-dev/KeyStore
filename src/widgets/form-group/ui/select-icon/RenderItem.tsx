import { TouchableNativeFeedback, View } from "react-native";

export function RenderItem(setSelected: any, size: number = 45) {
  return function renderItem({ item }: { item: { name: string; Icon: IconI }[] }) {
    return (
      <View className="flex-row items-center justify-center gap-2">
        {item.map((el, index) => (
          <View key={el.name || index}>
            <TouchableNativeFeedback
              onPress={() => {
                if (el.name) setSelected(el.name);
              }}
              background={TouchableNativeFeedback.Ripple("hsl(0,0, 50%)", false, size - 15)}
            >
              <View className="aspect-square items-center justify-center rounded-full p-[6px]">
                {el.Icon ? <el.Icon width={size} height={size} /> : <View style={{ height: size, width: size }} />}
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </View>
    );
  };
}
