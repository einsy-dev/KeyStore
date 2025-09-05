import { setMenu } from "@/lib/store/app";
import { useRouter } from "expo-router";
import { CirclePlus, DatabaseBackup, Settings } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { useBackupMenu } from "./useBackupMenu";

export function useMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const backupMenu = useBackupMenu();
  return [
    {
      name: "Add Group",
      icon: CirclePlus,
      callback: () => {
        router.push("/KeyGroupForm");
      }
    },
    {
      name: "Backup",
      icon: DatabaseBackup,
      callback: () => {
        setTimeout(() => {
          dispatch(setMenu({ active: true, menu: backupMenu }));
        }, 450);
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
