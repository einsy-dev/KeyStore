import { setModal } from "@/lib/store/app";
import { deleteGroup, selectData } from "@/lib/store/data";
import { Confirm } from "@/widgets/Modal/Confirm";
import { useRouter } from "expo-router";
import { CirclePlus, Edit, Trash } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

export function useMenu(groupId: string) {
  const data: DataListI = useSelector(selectData);
  const router = useRouter();
  const dispatch = useDispatch();
  return [
    {
      name: "Add key",
      icon: CirclePlus,
      callback: () => {
        router.push({
          pathname: "/(pages)/[groupId]/[keyId]",
          params: { groupId, keyId: "111" }
        });
      }
    },
    {
      name: "Edit",
      icon: Edit,
      callback: () => {
        router.push({
          pathname: "/(pages)/[groupId]",
          params: {
            groupId
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
