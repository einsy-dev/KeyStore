import { Text as TextC, TextProps } from "react-native";

export function Text({ children, className, ...props }: TextProps) {
  return (
    <TextC className={`dark:text-v-light ${className}`} {...props}>
      {children}
    </TextC>
  );
}
