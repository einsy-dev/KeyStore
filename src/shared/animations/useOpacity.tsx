import { useSharedValue, withTiming } from "react-native-reanimated";

const defaultConfig: OpacityConfigI = {
  duration: 300,
  durationOn: undefined,
  durationOff: undefined
};

export function useOpacity(config: Partial<OpacityConfigI> = {}) {
  const { duration, durationOn, durationOff } = { ...defaultConfig, ...config };
  const opacity = useSharedValue(0);

  function startOpacity(active: boolean) {
    if (active) {
      opacity.value = withTiming(1, { duration: durationOn !== undefined ? durationOn : duration });
    } else {
      opacity.value = withTiming(0, { duration: durationOff !== undefined ? durationOff : duration });
    }
  }
  return { opacity, startOpacity };
}
