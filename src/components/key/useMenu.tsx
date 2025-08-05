import { Confirm } from "@/components/confirm";
import { setModal } from "@/lib/store/app";
import { Edit, Trash } from "lucide-react-native";
import { useDispatch } from "react-redux";

export function useMenu() {
  const dispatch = useDispatch();
  return [
    {
      name: "Edit",
      icon: Edit,
      callback: () => {}
    },
    {
      name: "Delete",
      icon: Trash,
      callback: () => {
        dispatch(
          setModal({
            active: true,
            component: <Confirm title="Are you sure?" onSubmit={() => {}} />
          })
        );
      }
    }
  ];
}
