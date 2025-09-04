import { useScale } from "@/shared/animate";
import { ReactNode, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export function ScaleDecorator({
  active = false,
  children,
  className = "",
  style
}: {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  style?: ViewStyle;
}) {
  const { scale, startScale } = useScale();

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
