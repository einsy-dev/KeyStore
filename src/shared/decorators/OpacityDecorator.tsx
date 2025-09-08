import { useOpacity } from "@/animations";
import { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSlide } from "../animations/useSlide";

export function OpacityDecorator({
  active = false,
  children,
  opacityConfig,
  slideConfig,
  ...props
}: { active?: boolean; opacityConfig?: Partial<OpacityConfigI>; slideConfig?: Partial<SlideConfigI> } & ViewProps) {
  const { opacity, startOpacity } = useOpacity(opacityConfig);
  const { translateY, startSlide } = useSlide(slideConfig);

  useEffect(() => {
    if (active) {
      startSlide(active);
    } else {
      startSlide(active);
    }
    startOpacity(active);
  }, [active, startOpacity, startSlide]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));

  return (
    <Animated.View style={[style]} {...props}>
      {children}
    </Animated.View>
  );
}
