import { TouchableNativeFeedback, View } from "react-native";

export function RenderItem(selected: string, setSelected: any, size: number = 45) {
  return function renderItem({ item }: { item: { name: string; Icon: IconI }[] }) {
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
              <View
                className={`aspect-square items-center justify-center rounded-full ${selected && selected === el.name ? "border !p-[2px]" : "p-[4px]"}`}
              >
                {el.Icon ? <el.Icon width={size} height={size} /> : <View style={{ height: size, width: size }} />}
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </View>
    );
  };
}
