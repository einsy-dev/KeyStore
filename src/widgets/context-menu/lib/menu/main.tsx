import { i18 } from "@/lib/i18n";
import { useRouter } from "expo-router";
import { CirclePlus, Settings } from "lucide-react-native";

export function useMainMenu() {
  const router = useRouter();

  return [
    {
      name: i18("contextMenu.addGroup"),
      icon: CirclePlus,
      callback: () => {
        router.push({ pathname: "/(pages)/[groupId]", params: { groupId: "new" } });
      }
    },
    {
      name: i18("contextMenu.settings"),
      icon: Settings,
      callback: () => {
        router.push("/(pages)/settings");
      }
    }
  ];
}
