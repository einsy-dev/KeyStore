import { Icons } from "@/lib/icons";
import { useColorScheme } from "nativewind";

export function Icon({ iconId }: { iconId: string }) {
  const { colorScheme } = useColorScheme();
  const IconNode = Icons[iconId].icon;
  return (
    <IconNode
      height={22}
      width={22}
      color={colorScheme === "dark" ? "white" : "black"}
    />
  );
}
