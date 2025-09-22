import { useConfig } from "@/lib/providers";
import { useRouter } from "expo-router";
import { CirclePlus, Edit, Settings } from "lucide-react-native";

export function useMainMenu() {
  const router = useRouter();
  const { t } = useConfig();

  return [
    {
      name: t("contextMenu.addGroup"),
      icon: CirclePlus,
      callback: () => {
        router.push({ pathname: "/(pages)/[groupId]", params: { groupId: "new" } });
      }
    },
    {
      name: t("contextMenu.settings"),
      icon: Settings,
      callback: () => {
        router.push("/(pages)/settings");
      }
    },
    {
      name: "Edit",
      icon: Edit,
      callback: () => {
        router.setParams({ status: "edit" });
      }
    }
  ];
}
