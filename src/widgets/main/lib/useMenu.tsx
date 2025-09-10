import { useRouter } from "expo-router";
import { CirclePlus, Settings } from "lucide-react-native";

export function useMenu() {
  const router = useRouter();

  return [
    {
      name: "Add Group",
      icon: CirclePlus,
      callback: () => {
        router.push({ pathname: "/(pages)/[groupId]", params: { groupId: "new" } });
      }
    },
    {
      name: "Settings",
      icon: Settings,
      callback: () => {
        router.push("/(pages)/settings");
      }
    }
  ];
}
