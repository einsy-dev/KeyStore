import { decrypt, encrypt } from "@/lib/crypto";
import { setModal } from "@/lib/store/app";
import { selectData, setData } from "@/lib/store/data";
import { useSession } from "@/shared/hooks";
import { readFile, saveFile, shareFile } from "@/utils";
import { InputPassword } from "@/widgets/Modal/InputPass";
import { Download, File, Share } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

export function useBackupMenu() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const { call } = useSession();
  return [
    {
      name: "Share",
      icon: Share,
      callback: async () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <InputPassword
                title="Share"
                onSubmit={(password) => {
                  call(() =>
                    shareFile({
                      filename: new Date().toISOString(),
                      data: encrypt(JSON.stringify(data), password)
                    })
                  );
                }}
              />
            )
          })
        );
      }
    },
    {
      name: "Download",
      icon: Download,
      callback: async () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <InputPassword
                title="Download"
                onSubmit={(password) => {
                  call(() =>
                    saveFile({
                      filename: new Date().toISOString(),
                      data: encrypt(JSON.stringify(data), password)
                    })
                  );
                }}
              />
            )
          })
        );
      }
    },
    {
      name: "Import",
      icon: File,
      callback: async () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <InputPassword
                title="Import"
                onSubmit={(password) => {
                  call(async () => {
                    const file = await readFile();
                    dispatch(setData(JSON.parse(decrypt(file, password))));
                  });
                }}
              />
            )
          })
        );
      }
    }
  ];
}
