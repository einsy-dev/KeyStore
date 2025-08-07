import { Key } from "@/components/key";
import { KeyGroup } from "@/components/keyGroup";
import { setMenu } from "@/lib/store/app";
import { selectData, setData } from "@/lib/store/data";
import { useRouter } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import DragableFlatList, {
  ScaleDecorator
} from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const menu = useMenu();

  const renderItem = ({ item, drag }: { item: string; drag: any }) => (
    <ScaleDecorator activeScale={1.02}>
      <KeyGroup id={item} data={data[item]} drag={drag} className="mb-2">
        {Object.keys(data[item].keys)?.map((id: string, index: number) => (
          <View
            key={id}
            className={`flex-1 mx-2 flex-row gap-2 p-1 ${Object.keys(data[item].keys).length - 1 === index ? "mb-2" : ""}  `}
          >
            <Key groupId={item} id={id} data={data[item].keys[id].name} />
            <Key groupId={item} id={id} data={data[item].keys[id].value} />
          </View>
        ))}
      </KeyGroup>
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
      className="app flex-1"
    >
      <Pressable onPress={(e) => e.stopPropagation()}>
        <DragableFlatList
          data={Object.keys(data)}
          renderItem={renderItem}
          keyExtractor={(item: string) => item}
          onDragEnd={async ({ data: ids }) =>
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
          className="p-4"
        />
      </Pressable>
    </Pressable>
  );
}

function useMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  return [
    {
      name: "Add Group",
      icon: CirclePlus,
      callback: () => {
        router.navigate("/KeyGroupForm");
        dispatch(setMenu({ active: false }));
      }
    }
  ];
}
