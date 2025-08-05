import { setModal } from "@/lib/store/app";
import { useRouter } from "expo-router";
import { CirclePlus, Edit, Trash } from "lucide-react-native";
import { useDispatch } from "react-redux";

export function useMenu(groupId: string) {
  const router = useRouter();
  const dispatch = useDispatch();
  return [
    {
      name: "Add key",
      icon: CirclePlus,
      callback: () => {
        router.push({
          pathname: "/(pages)/KeyForm",
          params: { name: "123", value: "1234" }
        });
        dispatch(setModal({ active: false }));
      }
    },
    {
      name: "Edit",
      icon: Edit,
      callback: () => {}
    },
    {
      name: "Delete",
      icon: Trash,
      callback: () => {}
    }
  ];
}
