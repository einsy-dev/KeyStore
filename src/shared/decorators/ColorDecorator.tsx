import { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { useColor } from "../animations";

export function ColorDecorator({
  active = false,
  config,
  children,
  colorStart = "#0000FF",
  colorEnd = "#FF0000",
  decorate = "backgroundColor",
  ...props
}: {
  active?: boolean;
  config?: Partial<ColorConfigI>;
  colorStart?: string;
  colorEnd?: string;
  decorate?: "backgroundColor" | "borderColor";
} & ViewProps) {
  const { color, startColor } = useColor(config);

  useEffect(() => {
    startColor(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const style = useAnimatedStyle(() => {
    const animatedColor = interpolateColor(color.value, [0, 1], [colorStart, colorEnd]);
    if (decorate === "backgroundColor") {
      return {
        backgroundColor: animatedColor
      };
    } else if (decorate === "borderColor") {
      return {
        borderColor: animatedColor
      };
    } else {
      return {};
    }
  });

  return (
    <Animated.View style={[style]} {...props}>
      {children}
    </Animated.View>
  );
}
