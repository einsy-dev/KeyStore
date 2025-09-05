import { setData } from "@/lib/store/data";
import { View } from "@/shared/ui";
import DragableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { useDispatch } from "react-redux";
import { Group } from "../Group";
import { Key } from "../Key";

export function FlatList({ data }: { data: DataListI }) {
  const dispatch = useDispatch();
  const dataId: (DataI & { id: string })[] = Object.keys(data).map((id) => ({ id, ...data[id] }));

  return (
    <DragableFlatList
      data={dataId}
      renderItem={RenderItem}
      keyExtractor={(item) => item.id}
      onDragEnd={({ data: dataArr }) =>
        dispatch(
          setData(
            dataArr.reduce((acc, dataId, index) => {
              acc[dataId.id] = {
                ...dataId,
                order: index
              };
              return acc;
            }, {} as DataListI)
          )
        )
      }
    />
  );
}

function RenderItem({ item, drag }: { item: DataI & { id: string }; drag: any }) {
  return (
    <ScaleDecorator activeScale={1.02}>
      <View className="mb-2">
        <Group groupId={item.id} data={item} drag={drag}>
          {Object.keys(item.keys)?.map((id: string, index: number) => (
            <View
              key={id}
              className={`flex-1 mx-2 flex-row gap-2 p-1 ${Object.keys(item.keys).length - 1 === index ? "mb-2" : ""}  `}
            >
              <Key groupId={item.id} keyId={id} data={item.keys[id].name} />
              <Key groupId={item.id} keyId={id} data={item.keys[id].value} />
            </View>
          ))}
        </Group>
      </View>
    </ScaleDecorator>
  );
}
