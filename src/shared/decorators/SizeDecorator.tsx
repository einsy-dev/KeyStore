import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export function SizeDecorator({
  active,
  children,
  config,
  style,
  keyView = "",
  ...props
}: {
  active: SharedValue<boolean>;
  children?: ReactNode;
  config?: Partial<SizeConfigI>;
  keyView?: string;
} & ViewProps) {
  const h = useSharedValue(0);
  const h2 = useDerivedValue(() => {
    return withTiming(h.value * Number(active.value), { duration: 250 });
  });

  const sizeStyle = useAnimatedStyle(() => {
    return { height: h2.value };
  });

  return (
    <Animated.View key={keyView} style={[styles.animatedView, sizeStyle, style]} {...props}>
      <View
        onLayout={(e) => {
          h.value = e.nativeEvent.layout.height;
        }}
        style={[styles.container]}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    overflow: "hidden"
  },
  container: {
    position: "absolute",
    width: "100%",
    alignItems: "center"
  }
});
