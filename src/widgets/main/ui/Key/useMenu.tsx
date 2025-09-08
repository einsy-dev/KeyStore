import { setModal } from "@/lib/store/app";
import { deleteKey } from "@/lib/store/data";
import { useSession } from "@/shared/hooks";
import { shareText } from "@/utils";
import { Confirm } from "@/widgets/Modal/Confirm";
import { useRouter } from "expo-router";
import { Edit, Share, Trash } from "lucide-react-native";
import { useDispatch } from "react-redux";

export function useKeyMenu(groupId: string, keyId: string, value: string) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { call } = useSession();
  return [
    {
      name: "Share",
      icon: Share,
      callback: () => {
        call(() => shareText(value) as Promise<void>);
      }
    },
    {
      name: "Edit",
      icon: Edit,
      callback: () => {
        router.push({
          pathname: "/(pages)/[groupId]/[keyId]",
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
          setModal({
            component: (
              <Confirm
                onSubmit={() => {
                  dispatch(
                    deleteKey({
                      groupId,
                      keyId
                    })
                  );
                }}
                title="Delete key?"
              />
            ),
            active: true
          })
        );
      }
    }
  ];
}
