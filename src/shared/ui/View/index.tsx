import { View as ViewC, ViewProps } from "react-native";

export function View({ children, className, ...props }: ViewProps) {
  return (
    <ViewC className={`app ${className}`} {...props}>
      {children}
    </ViewC>
  );
}
