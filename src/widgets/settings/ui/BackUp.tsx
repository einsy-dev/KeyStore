import { decrypt } from "@/lib/crypto";
import { useConfig, useSession } from "@/lib/providers";
import { setModal } from "@/lib/store/app";
import { Button, TextInput } from "@/shared/ui";
import { delay, readFile } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Link } from "./Link";

export function Backup() {
  const { t } = useConfig();
  const disptch = useDispatch();
  return (
    <View>
      <Link
        title={t("settings.importBackUp")}
        cb={() => disptch(setModal({ active: true, component: <BackupModal isImport /> }))}
      />
      <Link title={t("settings.exportBackUp")} cb={() => {}} />
      <Link title={t("settings.downloadBackUp")} cb={() => {}} />
    </View>
  );
}

interface FileI {
  name: string;
  size: number | undefined;
  value: string;
}

function BackupModal({
  isImport = false,
  onSubmit
}: {
  isImport?: boolean;
  onSubmit?: (value: string, file: FileI) => void;
}) {
  const [value, setValue] = useState("");
  const { call } = useSession();
  const file = useRef<FileI | null>(null);

  useEffect(() => {
    if (isImport) {
      delay(() => {
        call(
          async () =>
            await readFile().then((res) => {
              file.current = res;
            })
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImport]);

  function ImportFile() {
    try {
      const json = JSON.parse(decrypt(file.current!.value, value));
      console.log(json);
    } catch {}
  }
  function ExportFile() {}
  function DownloadFile() {}
  return (
    <View className="card p-4 w-5/6 rounded gap-4">
      <View>
        <Text className="text">{file.current?.name}</Text>
      </View>
      <View className="flex-row">
        <TextInput className="text text-xl w-full" value={value} onChangeText={(text) => setValue(text)} />
      </View>

      <Button
        onPress={() => {
          try {
            const json = JSON.parse(decrypt(file.current!.value, value));
            console.log(json);
          } catch {}
        }}
      >
        Import
      </Button>
    </View>
  );
}
