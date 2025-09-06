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
    <View className="app flex-1">
      <View className="flex-1">
        <View className="app border rounded">
          <FlatList
            data={parseIcons(Icons, 5)}
            keyExtractor={(item: IconI[]) => item[0].name}
            renderItem={RenderItem(setSelected)}
            className={`h-[500px] w-full`}
          />
        </View>
        <View className="mt-auto gap-4">
          <Button
            onPress={() =>
              router.navigate({ pathname: "/(pages)/[groupId]", params: { groupId: "new", icon: selected } })
            }
          >
            Save
          </Button>
          <Button>Cancel</Button>
        </View>
      </View>
    </View>
  );
}
