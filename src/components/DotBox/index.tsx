import { Circle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming
} from "react-native-reanimated";

const colors = {
  success: "green",
  error: "yellow"
};

export function DotBox({ value, status }: { value: string; status: StatusT }) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "light" ? "black" : "white";
  const scaleValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  const shakeValue = useSharedValue(0);

  useEffect(() => {
    if (value) {
      scaleValue.value = withTiming(1.2, { duration: 100 });
      opacityValue.value = withTiming(1, { duration: 100 });
    } else {
      scaleValue.value = withTiming(1, { duration: 100 });
      opacityValue.value = withTiming(0, { duration: 100 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (status !== "error") return;
    shakeValue.value = withSequence(
      withTiming(5, { duration: 100 / 3 }),
      withTiming(-5, { duration: 100 / 3 }),
      withTiming(0, { duration: 100 / 3 })
    );
  }, [shakeValue, status]);

  const dotBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleValue.value
        },
        { translateX: shakeValue.value }
      ]
    };
  });

  const dotStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value
    };
  });

  return (
    <Animated.View
      className="border rounded aspect-[4/5] h-[60px] items-center justify-center"
      style={[status && { borderColor: colors[status] }, dotBoxStyle]}
    >
      <Animated.View style={[dotStyle]}>
        <Circle color={color} fill={color} />
      </Animated.View>
    </Animated.View>
  );
}
