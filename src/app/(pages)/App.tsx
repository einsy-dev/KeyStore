import { ContextMenu } from "@/components/ContextMenu";
import { Key } from "@/components/key";
import { KeyGroup } from "@/components/keyGroup";
import { setModal } from "@/lib/store/app";
import { selectData, setData } from "@/lib/store/data";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import DragableFlatList, {
  ScaleDecorator
} from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const menu = useMenu();

  const renderItem = ({ item, drag }: { item: DataI; drag: any }) => (
    <ScaleDecorator activeScale={1.05}>
      <KeyGroup drag={drag}>
        {Object.keys(item.keys).map((id: string) => (
          <Key key={id} data={item.keys[id]} />
        ))}
      </KeyGroup>
    </ScaleDecorator>
  );

  return (
    <Pressable
      onLongPress={() => {
        console.log("press");
        dispatch(
          setModal({
            active: true,
            component: <ContextMenu name="App" menu={menu} />,
            position: "bottom"
          })
        );
      }}
      className="app flex-1"
    >
      <DragableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: DataI) => String(item.id + item.name)}
        onDragEnd={({ data }) => dispatch(setData(data))}
        className="px-4 item"
      />
    </Pressable>
  );
}

function useMenu() {
  const router = useRouter();
  return [
    {
      name: "New Intro",
      callback: () => {
        router.navigate("/Form");
      }
    }
  ];
}
