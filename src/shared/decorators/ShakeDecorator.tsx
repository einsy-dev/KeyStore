import { useShake } from "@/animations";
import { ReactNode, useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export function ShakeDecorator({
  active = false,
  children,
  config,
  style,
  ...props
}: ViewProps & {
  active?: boolean;
  children?: ReactNode;
  config?: ShakeConfigI;
  style?: ViewStyle;
}) {
  const { shake, startShake } = useShake();

  useEffect(() => {
    if (!active) return;
    startShake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }]
  }));
  return (
    <Animated.View style={[style, scaleStyle]} {...props}>
      {children}
    </Animated.View>
  );
}
