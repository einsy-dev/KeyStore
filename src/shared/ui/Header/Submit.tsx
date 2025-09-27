import { selectHeader } from "@/lib/store/app";
import { useColor } from "@/shared/hooks";
import { ChevronDown } from "lucide-react-native";
import { useSelector } from "react-redux";
import { Button } from "./Button";

export function Submit() {
  const header = useSelector(selectHeader);
  const { color } = useColor();
  return (
    <Button callback={header?.onSubmit}>
      <ChevronDown color={color} width={30} height={30} />
    </Button>
  );
}
