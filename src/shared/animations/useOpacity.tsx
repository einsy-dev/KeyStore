import { useSharedValue, withTiming } from "react-native-reanimated";

export function useOpacity() {
  const opacity = useSharedValue(0);

  function startOpacity(active: boolean) {
    if (active) {
      opacity.value = withTiming(1, { duration: 100 });
    } else {
      opacity.value = withTiming(0, { duration: 100 });
    }
  }
  return { opacity, startOpacity };
}
