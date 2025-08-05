import { ContextMenu } from "@/components/contextMenu";
import { Key } from "@/components/key";
import { KeyGroup } from "@/components/keyGroup";
import { setModal } from "@/lib/store/app";
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
    <ScaleDecorator activeScale={1.05}>
      <KeyGroup data={data[item]} drag={drag}>
        <View className="">
          {Object.keys(data[item].keys || {}).map((id: string) => (
            <Key key={id} data={data[item].keys[id]} />
          ))}
        </View>
      </KeyGroup>
    </ScaleDecorator>
  );

  return (
    <Pressable
      onLongPress={() => {
        dispatch(
          setModal({
            active: true,
            component: <ContextMenu name="App" menu={menu} />,
            position: "bottom"
          })
        );
      }}
      className="app flex-1 p-2"
    >
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
        className="px-4 pt-1 pb-4 item rounded-xl"
      />
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
        dispatch(setModal({ active: false }));
      }
    }
  ];
}
