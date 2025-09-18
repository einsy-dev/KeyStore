import { useConfig, useSession } from "@/lib/providers";
import { setModal } from "@/lib/store/app";
import { deleteKey } from "@/lib/store/data";
import { delay, shareText } from "@/utils";
import { Confirm } from "@/widgets/modal/ui/Confirm";
import { useRouter } from "expo-router";
import { Edit, Share, Trash } from "lucide-react-native";
import { useDispatch } from "react-redux";

export function useKeyMenu(groupId: string, keyId: string, value: string) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { call } = useSession();
  const { t } = useConfig();
  return [
    {
      name: t("contextMenu.share"),
      icon: Share,
      callback: () => {
        delay(() => {
          call(() => shareText(value) as Promise<void>);
        }, 100);
      }
    },
    {
      name: t("contextMenu.edit"),
      icon: Edit,
      callback: () => {
        delay(() => {
          router.push({
            pathname: "/(pages)/[groupId]/[keyId]",
            params: {
              groupId,
              keyId
            }
          });
        });
      }
    },
    {
      name: t("contextMenu.delete"),
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
