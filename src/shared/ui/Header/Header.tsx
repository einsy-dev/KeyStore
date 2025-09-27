import { ReactNode } from "react";
import { View } from "react-native";

export function Header({ children, className }: { children?: ReactNode; className?: string }) {
  return <View className={`app flex-row justify-between items-center w-full ${className}`}>{children}</View>;
}
