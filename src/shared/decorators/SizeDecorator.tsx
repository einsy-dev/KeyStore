import { ReactNode, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useSize } from "../animations";

export function SizeDecorator({
  active,
  children,
  config,
  style,
  keyView = "",
  className = "",
  contentContainerClassName = "",
  ...props
}: {
  active: boolean;
  children?: ReactNode;
  config?: Partial<SizeConfigI>;
  contentContainerClassName?: string;
  keyView?: string;
} & ViewProps) {
  const { onLayout, height, startSize } = useSize(config);

  useEffect(() => {
    startSize(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const sizeStyle = useAnimatedStyle(() => {
    return { height: height.value };
  });

  return (
    <Animated.View key={keyView} style={[styles.animatedView, sizeStyle, style]} className={className}>
      <View onLayout={onLayout} style={[styles.container]} className={contentContainerClassName} {...props}>
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    overflow: "hidden"
  },
  container: {
    position: "absolute"
  }
});
