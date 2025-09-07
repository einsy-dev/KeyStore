import { useColor } from "@/hooks";
import { OpacityDecorator, ScaleDecorator } from "@/shared/decorators";
import { Circle } from "lucide-react-native";

export function Item({ value, status }: { value: string; status: "success" | "error" | null }) {
  const { iconColor, success, error, borderColor } = useColor();

  return (
    <ScaleDecorator
      active={value ? true : false}
      className="border rounded aspect-[4/5] h-[60px] items-center justify-center"
      style={{ borderColor: status === "success" ? success : status === "error" ? error : borderColor }}
    >
      <OpacityDecorator active={value || status === "success" ? true : false}>
        <Circle color={iconColor} fill={iconColor} />
      </OpacityDecorator>
    </ScaleDecorator>
  );
}
