import { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSlide } from "../animations/useSlide";

export function SlideDecorator({ active = false, children, ...props }: { active?: boolean } & ViewProps) {
  const { translateY, startSlide } = useSlide();

  useEffect(() => {
    startSlide(active);
  }, [active, startSlide]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  return (
    <Animated.View style={[style]} {...props}>
      {children}
    </Animated.View>
  );
}
