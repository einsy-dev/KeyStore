import { setModal } from "@/lib/store/app";
import { deleteGroup, selectData } from "@/lib/store/data";
import { useRouter } from "expo-router";
import { CirclePlus, Edit, Trash } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { Confirm } from "../Modal/Confirm";

export function useGroupMenu(groupId: string) {
  const data: DataListI = useSelector(selectData);
  const router = useRouter();
  const dispatch = useDispatch();
  return [
    {
      name: "Add key",
      icon: CirclePlus,
      callback: () => {
        router.push({
          pathname: "/KeyForm",
          params: { groupId }
        });
      }
    },
    {
      name: "Edit",
      icon: Edit,
      callback: () => {
        router.push({
          pathname: "/KeyGroupForm",
          params: {
            id: groupId,
            name: data[groupId].name,
            icon: data[groupId].icon
          }
        });
      }
    },
    {
      name: "Delete",
      icon: Trash,
      callback: () => {
        dispatch(
          setModal({
            component: (
              <Confirm
                onSubmit={() => {
                  dispatch(deleteGroup({ groupId }));
                }}
                title="Delete grpup and all it`s keys?"
              />
            ),
            active: true
          })
        );
      }
    }
  ];
}
