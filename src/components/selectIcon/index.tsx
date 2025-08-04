import { createId } from "@paralleldrive/cuid2";
import { Gamepad2, Globe, SquareChevronRight } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { View } from "../shared/view";

export function SelectIcon({ onSelect }: { onSelect?: (id: number) => void }) {
  const { colorScheme } = useColorScheme();
  return (
    <View>
      {IconsArr.map((el) => (
        <View key={createId()}>
          <el.icon color={colorScheme === "dark" ? "white" : "black"} />
        </View>
      ))}
    </View>
  );
}

const IconsArr = [
  {
    id: 1,
    title: "",
    icon: Globe
  },
  {
    id: 2,
    title: "",
    icon: SquareChevronRight
  },
  {
    id: 3,
    title: "",
    icon: Gamepad2
  },
  {
    id: 4,
    title: "",
    icon: Globe
  },
  {
    id: 5,
    title: "",
    icon: Globe
  },
  {
    id: 6,
    title: "",
    icon: Globe
  }
];
