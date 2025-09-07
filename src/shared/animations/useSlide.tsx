import { Dimensions } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

export function useSlide() {
  const translateY = useSharedValue<number>(0);

  function startSlide(active: boolean, config = { duration: 500 }) {
    if (active) {
      translateY.value = withTiming(0, config);
    } else {
      translateY.value = withTiming(Dimensions.get("screen").height, config);
    }
  }

  return { translateY, startSlide };
}
