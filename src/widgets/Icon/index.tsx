import * as Icons from "@/assets/icons";
import { useColor } from "@/hooks/useColor";
export function Icon({ iconId, className = "" }: { iconId: string; className?: string }) {
  const color = useColor();
  const icons = Object.values(Icons).map((el) => ({
    icon: el
  }));

  const IconNode = icons[iconId].icon;
  return <IconNode height={32} width={32} color={color.iconColor} className={className} />;
}
