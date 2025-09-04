import { useOpacity } from "@/shared/animate";
import { ReactNode, useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export function OpacityDecorator({
  active = false,
  children,
  ...props
}: {
  active?: boolean;
  children?: ReactNode;
  props?: ViewProps;
}) {
  const { opacity, startOpacity } = useOpacity();

  useEffect(() => {
    startOpacity(active);
  }, [active, startOpacity]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));
  return (
    <Animated.View style={[style]} {...props}>
      {children}
    </Animated.View>
  );
}
