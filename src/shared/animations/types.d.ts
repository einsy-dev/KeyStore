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
  translate: "x" | "y" | "xy";
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

interface ShakeConfigI {
  duration: number;
}
