import { useColor } from "@/hooks/useColor";
import { selectAuth } from "@/lib/store/auth";
import { Circle } from "lucide-react-native";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { useSelector } from "react-redux";

export function DotBox({ value }: { value: string }) {
  const color = useColor();
  const scaleValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  const shakeValue = useSharedValue(0);
  const status = useSelector(selectAuth);

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
    if (!status.error) return;
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
      style={[
        { borderColor: setColor(status) || color.textColor },
        dotBoxStyle
      ]}
    >
      <Animated.View style={[dotStyle]}>
        <Circle color={color.iconColor} fill={color.iconColor} />
      </Animated.View>
    </Animated.View>
  );
}

function setColor(status: AuthStatusI) {
  if (status.success) return "green";
  if (status.error) return "red";
}
