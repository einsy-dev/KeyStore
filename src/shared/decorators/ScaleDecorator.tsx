import { useScale } from "@/animations";
import { ReactNode, useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export function ScaleDecorator({
  active = false,
  children,
  config,
  ...props
}: {
  active?: boolean;
  children?: ReactNode;
  config?: Partial<ScaleConfigI>;
} & ViewProps) {
  const { scale, startScale } = useScale(config);

  useEffect(() => {
    startScale(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));
  return (
    <Animated.View style={[style]} {...props}>
      {children}
    </Animated.View>
  );
}
