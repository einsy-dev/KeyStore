import { useSharedValue, withTiming } from "react-native-reanimated";

export function useScale() {
  const scale = useSharedValue(0);

  function startScale(active: boolean) {
    if (active) {
      scale.value = withTiming(1.2, { duration: 100 });
    } else {
      scale.value = withTiming(1, { duration: 100 });
    }
  }
  return { scale, startScale };
}
