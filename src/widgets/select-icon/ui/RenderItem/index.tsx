import { TouchableNativeFeedback, View } from "react-native";

export function RenderItem(setSelected: any) {
  return function renderItem({ item }: { item: IconI[] }) {
    return (
      <View className="flex-row gap-2 items-center justify-center ">
        {item.map((el, index) => (
          <View key={el.name || index}>
            <TouchableNativeFeedback
              onPress={() => {
                if (el.name) setSelected(el.name);
              }}
              background={TouchableNativeFeedback.Ripple("hsl(0,0, 50%)", false, 22)}
            >
              <View className="aspect-square items-center justify-center rounded-full p-2">
                {el.Icon ? <el.Icon width={35} height={35} /> : <View style={{ height: 35, width: 35 }} />}
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </View>
    );
  };
}
