import { Text as TextC, TextProps } from "react-native";

export function Text({ children, className, ...props }: TextProps) {
  return (
    <TextC className={`text_c ${className}`} {...props}>
      {children}
    </TextC>
  );
}
