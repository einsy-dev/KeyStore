import { useSharedValue, withTiming } from "react-native-reanimated";

export function useOpacity() {
  const opacity = useSharedValue(0);

  function startOpacity(active: boolean, config = { duration: 500 }) {
    if (active) {
      opacity.value = withTiming(1, config);
    } else {
      opacity.value = withTiming(0, config);
    }
  }
  return { opacity, startOpacity };
}
