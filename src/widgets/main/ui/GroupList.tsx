import { selectListData, setData } from "@/lib/store/data";
import { Group } from "@/shared/ui/Group";
import { Key } from "@/shared/ui/Key";
import { useCallback, useState } from "react";
import DragableFlatList, { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";

export function GroupList() {
  const data = useSelector(selectListData);
  const dispatch = useDispatch();
  const [active, setActive] = useState<string | null>(null);

  const renderItem = useCallback(
    ({ item, drag }: RenderItemParams<GroupI>) => (
      <ScaleDecorator activeScale={1.05}>
        <Group data={item} drag={drag} className="mb-2" active={active === item.id} setActive={setActive}>
          {Object.keys(item.keys).length
            ? Object.keys(item.keys).map((keyId: string) => (
                <Key key={keyId} groupId={item.id} data={item.keys[keyId]} />
              ))
            : null}
        </Group>
      </ScaleDecorator>
    ),
    [active]
  );

  return (
    <DragableFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id + "-" + index}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="px-4"
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
