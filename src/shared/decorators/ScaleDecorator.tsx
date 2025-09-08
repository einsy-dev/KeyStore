import { useScale } from "@/animations";
import { ReactNode, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export function ScaleDecorator({
  active = false,
  children,
  config,
  className = "",
  style
}: {
  active?: boolean;
  children?: ReactNode;
  config?: Partial<ScaleConfigI>;
  className?: string;
  style?: ViewStyle;
}) {
  const { scale, startScale } = useScale(config);

  useEffect(() => {
    startScale(active);
  }, [active, startScale]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));
  return (
    <Animated.View style={[style, scaleStyle]} className={className}>
      {children}
    </Animated.View>
  );
}
