import { useSharedValue, withTiming } from "react-native-reanimated";

const defaultConfig: SlideConfigI = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  duration: 300,
  durationOnX: undefined,
  durationOffX: undefined,
  durationOnY: undefined,
  durationOffY: undefined
};

export function useSlide(config: Partial<SlideConfigI> = {}) {
  const { startX, startY, endX, endY, duration, durationOnX, durationOnY, durationOffX, durationOffY } = {
    ...defaultConfig,
    ...config
  };
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  function startSlide(active: boolean) {
    if (active) {
      translateX.value = withTiming(endX, { duration: durationOnX !== undefined ? durationOnX : duration });
      translateY.value = withTiming(endY, { duration: durationOnY !== undefined ? durationOnY : duration });
    } else {
      translateX.value = withTiming(startX, { duration: durationOffX !== undefined ? durationOffX : duration });
      translateY.value = withTiming(startY, { duration: durationOffY !== undefined ? durationOffY : duration });
    }
  }
  return { translateY, translateX, startSlide };
}
