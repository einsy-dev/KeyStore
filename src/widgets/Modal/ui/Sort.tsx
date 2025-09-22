import { selectListData, setData } from "@/lib/store/data";
import { Group } from "@/shared/ui/Group";
import { GripVertical } from "lucide-react-native";
import { useCallback } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import DragableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";

export function Sort() {
  const data = useSelector(selectListData);
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ item, drag }: RenderItemParams<GroupI>) => (
      <View className="flex-row items-center card rounded">
        <TouchableWithoutFeedback onPressIn={drag}>
          <View className="p-2 rounded-full">
            <GripVertical />
          </View>
        </TouchableWithoutFeedback>
        <Group data={item} className="flex-1" disabled />
      </View>
    ),
    []
  );

  return (
    <View className="app rounded-xl p-4 gap-2 w-full">
      <DragableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + "-" + index}
        showsVerticalScrollIndicator={false}
        onDragEnd={({ data: dataArr }) =>
          dispatch(
            setData(
              dataArr.reduce(
                (acc, dataId) => {
                  acc[dataId.id] = {
                    ...dataId
                  };
                  return acc;
                },
                {} as { [id: string]: GroupI }
              )
            )
          )
        }
      />
    </View>
  );
}
