import { useSharedValue, withTiming } from "react-native-reanimated";
const defaultConfig: ScaleConfigI = {
  scale: 1.2,
  duration: 300,
  durationOn: undefined,
  durationOff: undefined
};
export function useScale(config: Partial<ScaleConfigI> = {}) {
  const { duration, scale, durationOn, durationOff } = { ...defaultConfig, ...config };
  const sharedScale = useSharedValue(0);

  function startScale(active: boolean) {
    if (active) {
      sharedScale.value = withTiming(scale, { duration: durationOn !== undefined ? durationOn : duration });
    } else {
      sharedScale.value = withTiming(1, { duration: durationOff !== undefined ? durationOff : duration });
    }
  }
  return { scale: sharedScale, startScale };
}
