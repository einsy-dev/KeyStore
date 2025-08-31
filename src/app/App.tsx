import { Key } from "@/components/Key";
import { KeyGroup } from "@/components/KeyGroup";
import { useAppMenu } from "@/components/Menu/useAppMenu";
import { setMenu } from "@/lib/store/app";
import { selectData, setData } from "@/lib/store/data";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import DragableFlatList, {
  ScaleDecorator
} from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const data: DataListI = useSelector(selectData);
  const [active, setActive] = useState<string | null>(null);
  const menu = useAppMenu();

  const renderItem = ({ item, drag }: { item: string; drag: any }) => (
    <ScaleDecorator activeScale={1.02}>
      <View className="mb-2">
        <KeyGroup
          groupId={item}
          data={data[item]}
          drag={drag}
          active={active === item}
          setActive={setActive}
        >
          {Object.keys(data[item].keys)?.map((id: string, index: number) => (
            <View
              key={id}
              className={`flex-1 mx-2 flex-row gap-2 p-1 ${Object.keys(data[item].keys).length - 1 === index ? "mb-2" : ""}  `}
            >
              <Key groupId={item} keyId={id} data={data[item].keys[id].name} />
              <Key groupId={item} keyId={id} data={data[item].keys[id].value} />
            </View>
          ))}
        </KeyGroup>
      </View>
    </ScaleDecorator>
  );

  return (
    <Pressable
      onLongPress={() => {
        dispatch(
          setMenu({
            active: true,
            menu
          })
        );
      }}
      className="app flex-1 p-4"
    >
      <Pressable onPress={(e) => e.stopPropagation()}>
        <DragableFlatList
          data={Object.keys(data)}
          renderItem={renderItem}
          keyExtractor={(item: string) => item}
          onDragEnd={({ data: ids }) =>
            dispatch(
              setData(
                ids.reduce((acc, id, index) => {
                  acc[id] = {
                    ...data[id],
                    order: index
                  };
                  return acc;
                }, {} as DataListI)
              )
            )
          }
        />
      </Pressable>
    </Pressable>
  );
}
