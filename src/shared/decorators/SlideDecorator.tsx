import { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSlide } from "../animations/useSlide";

export function SlideDecorator({
  active = false,
  config,
  children,
  ...props
}: { active?: boolean; config?: Partial<SlideConfigI> } & ViewProps) {
  const { translateY, translateX, startSlide } = useSlide(config);

  useEffect(() => {
    startSlide(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { translateX: translateX.value }]
  }));

  return (
    <Animated.View style={[style]} {...props}>
      {children}
    </Animated.View>
  );
}
