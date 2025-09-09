import { useSize } from "@/animations";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { View } from "react-native";
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
  const [sizeConfig, setSizeConfig] = useState(config);
  const { width, height, startSize } = useSize(sizeConfig);

  const ref = useRef<View>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.measure((...data) => {
      setSizeConfig((prev) => ({ ...prev, endHeight: data[3] }));
    });
  }, [ref]);

  useEffect(() => {
    startSize(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const sizeStyle = useAnimatedStyle(() => {
    if (!sizeConfig) return {};
    const { startHeight, startWidth, endHeight, endWidth } = sizeConfig;
    const res: { height?: number; width?: number } = {};

    if ((startHeight !== undefined || endHeight !== undefined) && startHeight !== endHeight) {
      res.height = height.value;
    }
    if ((startWidth !== undefined || endWidth !== undefined) && startWidth !== endWidth) {
      res.width = width.value;
    }
    return res;
  });

  return (
    <Animated.View style={[sizeStyle, style]} {...props}>
      <View ref={ref}>{children}</View>
    </Animated.View>
  );
}
