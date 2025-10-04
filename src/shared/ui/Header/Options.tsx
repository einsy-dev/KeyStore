import { useColor } from "@/shared/hooks";
import { EllipsisVertical } from "lucide-react-native";
import { Button } from "./Button";

export function Options({
  size = 30,
  className = "",
  onPress
}: {
  size?: number;
  className?: string;
  onPress: () => void;
}) {
  const { color } = useColor();
  return (
    <Button callback={onPress} className={className}>
      <EllipsisVertical color={color} width={size} height={size} />
    </Button>
  );
}
