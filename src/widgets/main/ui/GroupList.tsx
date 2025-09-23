import { selectListData, setData } from "@/lib/store/data";
import { Group } from "@/shared/ui/Group";
import { Key } from "@/shared/ui/Key";
import { useCallback } from "react";
import DragableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";

export function GroupList() {
  const data = useSelector(selectListData);
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ item, drag }: RenderItemParams<GroupI>) => (
      <Group data={item} drag={drag} className="mb-2">
        {Object.keys(item.keys).length
          ? Object.keys(item.keys).map((keyId: string) => <Key key={keyId} groupId={item.id} data={item.keys[keyId]} />)
          : null}
      </Group>
    ),
    []
  );

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
