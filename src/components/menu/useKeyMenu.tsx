import { deleteKey } from "@/lib/store/data";
import { shareText } from "@/utils";
import { useRouter } from "expo-router";
import { Edit, Share, Trash } from "lucide-react-native";
import { useDispatch } from "react-redux";

export function useKeyMenu(groupId: string, keyId: string, value: string) {
  const dispatch = useDispatch();
  const router = useRouter();
  return [
    {
      name: "Share",
      icon: Share,
      callback: () => {
        shareText(value);
      }
    },
    {
      name: "Edit",
      icon: Edit,
      callback: () => {
        router.push({
          pathname: "/KeyForm",
          params: {
            groupId,
            keyId
          }
        });
      }
    },
    {
      name: "Delete",
      icon: Trash,
      callback: () => {
        dispatch(
          deleteKey({
            groupId,
            keyId
          })
        );
      }
    }
  ];
}
