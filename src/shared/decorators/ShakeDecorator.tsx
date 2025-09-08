import { useShake } from "@/animations";
import { ReactNode, useEffect } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export function ShakeDecorator({
  active = false,
  children,
  config,
  ...props
}: {
  active?: boolean;
  children?: ReactNode;
  config?: ShakeConfigI;
} & ViewProps) {
  const { shake, startShake } = useShake();

  useEffect(() => {
    if (!active) return;
    startShake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }]
  }));
  return (
    <Animated.View style={[style]} {...props}>
      {children}
    </Animated.View>
  );
}
