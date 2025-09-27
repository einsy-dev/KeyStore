import { selectHeader } from "@/lib/store/app";
import { useColor } from "@/shared/hooks";
import { EllipsisVertical } from "lucide-react-native";
import { useSelector } from "react-redux";
import { Button } from "./Button";

export function Options({ size = 30, className = "" }: { size?: number; className?: string }) {
  const header = useSelector(selectHeader);
  const { color } = useColor();
  return (
    <Button callback={header?.onMenu} className={className}>
      <EllipsisVertical color={color} width={size} height={size} />
    </Button>
  );
}
