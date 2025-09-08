interface SlideConfigI {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  durationOnX: number | undefined;
  durationOnY: number | undefined;
  durationOffX: number | undefined;
  durationOffY: number | undefined;
}

interface ColorConfigI {
  duration: number;
  durationOn: number | undefined;
  durationOff: number | undefined;
}
interface OpacityConfigI {
  duration: number;
  durationOn: number | undefined;
  durationOff: number | undefined;
}

interface ScaleConfigI {
  scale: number;
  duration: number;
  durationOn: number | undefined;
  durationOff: number | undefined;
}

interface SizeConfigI {
  startWidth: number;
  startHeight: number;
  endWidth: number;
  endHeight: number;
  duration: number;
  durationOnWidth: number | undefined;
  durationOnHeight: number | undefined;
  durationOffWidth: number | undefined;
  durationOffHeight: number | undefined;
}

interface ShakeConfigI {
  duration: number;
}
