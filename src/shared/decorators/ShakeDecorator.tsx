import { useShake } from "@/shared/animate";
import { ReactNode, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export function ShakeDecorator({
  active = false,
  children,
  style,
  ...props
}: ViewProps & {
  active?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
}) {
  const { shake, startShake } = useShake();

  useEffect(() => {
    if (!active) return;
    startShake();
  }, [active, startShake]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }]
  }));
  return (
    <Animated.View style={[style, scaleStyle]} {...props}>
      {children}
    </Animated.View>
  );
}
