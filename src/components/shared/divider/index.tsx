import { View } from "../view";

export function Divider({ className = "" }: { className?: string }) {
  return <View className={`h-[1px] rounded-full bg-v-red ${className}`} />;
}
