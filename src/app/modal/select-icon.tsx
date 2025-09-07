import * as Icons from "@/assets/icons";
import { Button } from "@/shared/ui";
import { parseIcons, RenderItem } from "@/widgets/select-icon";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function Modal() {
  const [selected, setSelected] = useState("");
  const router = useRouter();
  return (
    <View className="app flex-1 p-4 gap-4">
      <View className="app flex-1 border rounded">
        <FlatList
          data={parseIcons(Icons, 5)}
          keyExtractor={(item: { name: string; Icon: IconI }[]) => item[0].name}
          renderItem={RenderItem(selected, setSelected, 45)}
          extraData={selected}
        />
      </View>
      <View className="mt-auto gap-4">
        <Button
          onPress={() => {
            router.dismiss();
            router.setParams({ icon: selected });
          }}
        >
          Save
        </Button>
      </View>
    </View>
  );
}
