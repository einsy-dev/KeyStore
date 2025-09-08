import { Dimensions } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

const defaultConfig: SlideConfigI = {
  startX: 0,
  startY: 0,
  endX: Dimensions.get("screen").width,
  endY: Dimensions.get("screen").height,
  duration: 300,
  durationOnX: undefined,
  durationOffX: undefined,
  durationOnY: undefined,
  durationOffY: undefined,
  translate: "y"
};

export function useSlide(config: Partial<SlideConfigI> = {}) {
  const { startX, startY, endX, endY, translate, duration, durationOnX, durationOnY, durationOffX, durationOffY } = {
    ...defaultConfig,
    ...config
  };
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  function startSlide(active: boolean) {
    if (active) {
      if (translate?.includes("x")) {
        translateX.value = withTiming(startX, { duration: durationOnX !== undefined ? durationOnX : duration });
      }
      if (translate?.includes("y")) {
        translateY.value = withTiming(startY, { duration: durationOnY !== undefined ? durationOnY : duration });
      }
    } else {
      if (translate?.includes("x")) {
        translateX.value = withTiming(endX, { duration: durationOffX !== undefined ? durationOffX : duration });
      }
      if (translate?.includes("y")) {
        translateY.value = withTiming(endY, { duration: durationOffY !== undefined ? durationOffY : duration });
      }
    }
  }
  return { translateY, translateX, startSlide };
}
