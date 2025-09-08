import { useSharedValue, withTiming } from "react-native-reanimated";

const defaultConfig: ColorConfigI = {
  duration: 300,
  durationOn: undefined,
  durationOff: undefined
};

export function useColor(config: Partial<ColorConfigI> = {}) {
  const { duration, durationOn, durationOff } = { ...defaultConfig, ...config };
  const color = useSharedValue(0);

  function startColor(active: boolean) {
    if (active) {
      color.value = withTiming(1, { duration: durationOn !== undefined ? durationOn : duration });
    } else {
      color.value = withTiming(0, { duration: durationOff !== undefined ? durationOff : duration });
    }
  }
  return { color, startColor };
}
