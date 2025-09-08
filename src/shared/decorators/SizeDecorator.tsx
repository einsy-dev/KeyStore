import { useSize } from "@/animations";
import { ReactNode, useEffect } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export function SizeDecorator({
  active = false,
  children,
  config,
  style,
  ...props
}: {
  active?: boolean;
  children?: ReactNode;
  config?: Partial<SizeConfigI>;
} & ViewProps) {
  const { width, height, startSize } = useSize(config);

  useEffect(() => {
    startSize(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const sizeStyle = useAnimatedStyle(() => {
    if (!config) return {};
    const { startHeight, startWidth, endHeight, endWidth } = config;
    const res: { height?: number; width?: number } = {};
    if ((startHeight || endHeight) && startHeight !== endHeight) {
      res.height = height.value;
    }
    if ((startWidth || endWidth) && startWidth !== endWidth) {
      res.width = width.value;
    }
    return res;
  });

  return (
    <Animated.View style={[sizeStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}
