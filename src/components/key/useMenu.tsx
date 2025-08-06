import { deleteKey, selectData } from "@/lib/store/data";
import { useRouter } from "expo-router";
import { Edit, Trash } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

export function useMenu(groupId: string, keyId: string) {
  const dispatch = useDispatch();
  const router = useRouter();
  const data = useSelector(selectData);
  return [
    {
      name: "Edit",
      icon: Edit,
      callback: () => {
        router.push({
          pathname: "/(pages)/KeyForm",
          params: {
            ...data[groupId].keys[keyId]
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
