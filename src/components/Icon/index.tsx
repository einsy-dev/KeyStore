import { Icons } from "@/lib/icons";
import { useColorScheme } from "nativewind";

export function Icon({
  iconId,
  className = ""
}: {
  iconId: string;
  className?: string;
}) {
  const { colorScheme } = useColorScheme();
  const IconNode = Icons[iconId].icon;
  return (
    <IconNode
      height={32}
      width={32}
      color={colorScheme === "dark" ? "white" : "black"}
      className={className}
    />
  );
}
