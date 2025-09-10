import { selectListData, setData } from "@/lib/store/data";
import { useCallback } from "react";
import { View } from "react-native";
import DragableFlatList, { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { Group } from "../Group";
import { Key } from "../Key";

export function FlatList() {
  const dispatch = useDispatch();
  const data = useSelector(selectListData);
  const renderItem = useCallback(({ item, drag }: RenderItemParams<GroupI>) => {
    return (
      <ScaleDecorator activeScale={1.02}>
        <View className="mb-2">
          <Group groupId={item.id} data={item} drag={drag}>
            {Object.keys(item.keys)?.map((id: string, index: number) => (
              <View
                key={id}
                className={`flex-1 mx-4 flex-row gap-2 p-1 ${Object.keys(item.keys).length - 1 === index ? "mb-2" : ""} ${index === 0 ? "mt-2" : ""} `}
              >
                <Key groupId={item.id} keyId={id} data={item.keys[id].name} />
                <Key groupId={item.id} keyId={id} data={item.keys[id].value} />
              </View>
            ))}
          </Group>
        </View>
      </ScaleDecorator>
    );
  }, []);

  return (
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
  );
}
