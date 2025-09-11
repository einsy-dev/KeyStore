import { useColor } from "@/hooks/useColor";
import { ColorDecorator, OpacityDecorator, ScaleDecorator } from "@/shared/decorators";
import { Circle } from "lucide-react-native";

export function Item({ value, status }: { value: string; status: "success" | "error" | null }) {
  const { color } = useColor();

  return (
    <ScaleDecorator
      active={value || status === "success" ? true : false}
      config={{ durationOn: 100, durationOff: 200 }}
    >
      <ColorDecorator
        active={status === "success" || status === "error"}
        decorate="borderColor"
        colorStart={color === "white" ? "#fff" : "#000"}
        colorEnd={status === "success" ? "green" : status === "error" ? "red" : undefined}
        config={{ durationOn: 100, durationOff: 200 }}
        className="border rounded aspect-[4/5] h-[60px] items-center justify-center"
      >
        <OpacityDecorator active={value || status === "success" ? true : false} slideConfig={{ duration: 0 }}>
          <Circle color={color} fill={color} />
        </OpacityDecorator>
      </ColorDecorator>
    </ScaleDecorator>
  );
}
