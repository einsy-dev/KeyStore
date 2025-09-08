import { selectListData, setData } from "@/lib/store/data";
import { delay } from "@/utils";
import { View } from "react-native";
import DragableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { Group } from "../Group";
import { Key } from "../Key";

export function FlatList() {
  const dispatch = useDispatch();
  const data = useSelector(selectListData);

  return (
    <DragableFlatList
      data={data}
      renderItem={RenderItem}
      keyExtractor={(item, index) => item.id + "-" + index}
      onDragEnd={({ data: dataArr }) =>
        delay(() => {
          dispatch(
            setData(
              dataArr.reduce((acc, dataId) => {
                acc[dataId.id] = {
                  ...dataId
                };
                return acc;
              }, {} as DataListI)
            )
          );
        }, 100)
      }
    />
  );
}

function RenderItem({ item, drag }: { item: DataI & { id: string }; drag: any }) {
  return (
    <ScaleDecorator activeScale={1.02}>
      <View className="mb-2">
        <Group groupId={item.id} data={item} drag={drag} className="bg-v-dark rounded">
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
