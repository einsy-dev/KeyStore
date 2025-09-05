import { useSharedValue, withSequence, withTiming } from "react-native-reanimated";

export function useShake() {
  const shake = useSharedValue(0);

  function startShake() {
    shake.value = withSequence(
      withTiming(5, { duration: 150 / 3 }),
      withTiming(-5, { duration: 150 / 3 }),
      withTiming(0, { duration: 150 / 3 })
    );
  }
  return { shake, startShake };
}
