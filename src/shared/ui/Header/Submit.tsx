import { useColor } from "@/shared/hooks";
import { ChevronDown } from "lucide-react-native";
import { Button } from "./Button";

export function Submit({ onPress }: { onPress?: () => void }) {
  const { color } = useColor();
  return (
    <Button callback={onPress}>
      <ChevronDown color={color} width={30} height={30} />
    </Button>
  );
}
