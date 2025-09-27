import { selectHeader } from "@/lib/store/app";
import { ChevronDown } from "lucide-react-native";
import { useSelector } from "react-redux";
import { Button } from "./Button";

export function Submit() {
  const header = useSelector(selectHeader);
  return (
    <Button callback={header?.onSubmit}>
      <ChevronDown width={30} height={30} />
    </Button>
  );
}
