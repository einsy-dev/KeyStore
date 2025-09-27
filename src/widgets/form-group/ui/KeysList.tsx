import { Key } from "@/shared/ui/Key";
import { useRouter } from "expo-router";
import { GripVertical } from "lucide-react-native";
import { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

export function KeyList({
  state,
  setState,
  data,
  groupId
}: {
  state: Optinal<GroupI, "id">;
  setState: Dispatch<SetStateAction<Optinal<GroupI, "id">>>;
  data: { [id: string]: GroupI };
  groupId: string;
}) {
  const router = useRouter();
  return (
    <View>
      {Object.keys(state.keys).length ? (
        <View className="card pe-2 pt-2 rounded">
          <DraggableFlatList
            data={Object.keys(state.keys).map((id) => ({ ...state.keys[id] }))}
            keyExtractor={(item: KeyI, index: number) => `dragable_list-${item.id}-${index} `}
            renderItem={({ item, drag }: { item: KeyI; drag: () => void }) => {
              return (
                <View className="mb-2 flex-row items-center justify-center">
                  <Pressable onPressIn={drag}>
                    <GripVertical width={30} height={30} />
                  </Pressable>
                  <Key
                    groupId={groupId}
                    data={data[groupId].keys[item.id]}
                    onPress={() =>
                      router.push({ pathname: "/(pages)/[groupId]/[keyId]", params: { groupId, keyId: item.id } })
                    }
                    onLongPress={() => null}
                  />
                </View>
              );
            }}
            onDragEnd={({ data }) => {
              setState((prev) => ({
                ...prev,
                keys: data.reduce(
                  (acc, el) => {
                    acc[el.id] = el;
                    return acc;
                  },
                  {} as { [id: string]: KeyI }
                )
              }));
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
