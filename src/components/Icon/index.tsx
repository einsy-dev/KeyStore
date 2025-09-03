import { useColor } from "@/hooks/useColor";
import { Icons } from "@/lib/icons";

export function Icon({
  iconId,
  className = ""
}: {
  iconId: string;
  className?: string;
}) {
  const color = useColor();
  const IconNode = Icons[iconId].icon;
  return (
    <IconNode height={32} width={32} color={color} className={className} />
  );
}
