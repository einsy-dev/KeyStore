import { LayoutChangeEvent } from "react-native";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

const defaultConfig: SizeConfigI = {
  duration: 300,
  durationOnWidth: undefined,
  durationOnHeight: undefined,
  durationOffWidth: undefined,
  durationOffHeight: undefined
};

export function useSize(config: Partial<SizeConfigI> = {}) {
  const { duration, durationOnHeight, durationOnWidth, durationOffHeight, durationOffWidth } = {
    ...defaultConfig,
    ...config
  };
  const status = useSharedValue(false);

  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(status.value), {
      duration: status.value ? durationOnHeight || duration : durationOffHeight || duration
    })
  );
  const derivedWidth = useDerivedValue(() =>
    withTiming(width.value * Number(status.value), {
      duration: status.value ? durationOnWidth || duration : durationOffWidth || duration
    })
  );

  function onLayout(e: LayoutChangeEvent): void {
    height.value = e.nativeEvent.layout.height;
    width.value = e.nativeEvent.layout.height;
  }

  function startSize(active: boolean) {
    status.value = active;
  }
  return { onLayout, height: derivedHeight, width: derivedWidth, startSize };
}
