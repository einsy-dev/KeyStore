import { selectHeader } from "@/lib/store/app";
import { ChevronDown, ChevronLeft, EllipsisVertical } from "lucide-react-native";

import { ReactNode } from "react";
import { TouchableNativeFeedback, View } from "react-native";
import { useSelector } from "react-redux";

export function Header() {
  const header = useSelector(selectHeader);

  return (
    <View className="app flex-row justify-between items-center w-full">
      <View className="">
        <Button callback={header?.onBack}>
          <ChevronLeft width={30} height={30} />
        </Button>
      </View>
      <View className="flex-row gap-4">
        <Button callback={header?.onMenu}>
          <EllipsisVertical width={30} height={30} />
        </Button>
        <Button callback={header?.onSubmit}>
          <ChevronDown width={30} height={30} />
        </Button>
      </View>
    </View>
  );
}

function Button({ children, callback }: { children?: ReactNode; callback: () => void }) {
  if (!callback || typeof callback !== "function" || !children) return null;
  return (
    <TouchableNativeFeedback onPress={callback} background={TouchableNativeFeedback.Ripple("hsl(0,0, 50%)", false, 20)}>
      <View className="p-2">{children}</View>
    </TouchableNativeFeedback>
  );
}
