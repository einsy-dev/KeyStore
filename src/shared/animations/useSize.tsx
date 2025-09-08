import { useSharedValue, withTiming } from "react-native-reanimated";

const defaultConfig: SizeConfigI = {
  startWidth: 0,
  startHeight: 0,
  endWidth: 0,
  endHeight: 0,
  duration: 300,
  durationOnWidth: undefined,
  durationOnHeight: undefined,
  durationOffWidth: undefined,
  durationOffHeight: undefined
};

export function useSize(config: Partial<SizeConfigI> = {}) {
  const {
    startHeight,
    startWidth,
    endHeight,
    endWidth,
    duration,
    durationOnHeight,
    durationOnWidth,
    durationOffHeight,
    durationOffWidth
  } = {
    ...defaultConfig,
    ...config
  };
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  function startSize(active: boolean) {
    if (active) {
      height.value = withTiming(endHeight, { duration: durationOnHeight !== undefined ? durationOnHeight : duration });
      width.value = withTiming(endWidth, { duration: durationOnWidth !== undefined ? durationOnHeight : duration });
    } else {
      height.value = withTiming(startHeight, {
        duration: durationOffHeight !== undefined ? durationOffHeight : duration
      });
      height.value = withTiming(startWidth, {
        duration: durationOffWidth !== undefined ? durationOffHeight : duration
      });
    }
  }
  return { height, width, startSize };
}
