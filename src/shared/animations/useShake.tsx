import { useSharedValue, withSequence, withTiming } from "react-native-reanimated";

// add repeat shakeValue,
const defaultConfig: ShakeConfigI = {
  duration: 200
};

export function useShake(config: Partial<ShakeConfigI> = {}) {
  const { duration } = { ...defaultConfig, ...config };
  const shake = useSharedValue(0);

  function startShake() {
    shake.value = withSequence(
      withTiming(5, { duration: duration / 3 }),
      withTiming(-5, { duration: duration / 3 }),
      withTiming(0, { duration: duration / 3 })
    );
  }
  return { shake, startShake };
}
