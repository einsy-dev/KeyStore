import { Intro } from "@/components/Intro";
import { ContextMenu, Form } from "@/components/widgets";
import { setModal } from "@/lib/store/app";
import { createIntro, selectData, setData } from "@/lib/store/data";
import { useCallback } from "react";
import { Pressable } from "react-native";
import DragableFlatList from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const data = useSelector(selectData);
  const dispatch = useDispatch();
  const menu = [
    {
      name: "New Intro",
      callback: () => {
        dispatch(
          setModal({
            active: true,
            component: (
              <Form
                data={{ name: "" }}
                onSubmit={(newIntro: any) =>
                  dispatch(createIntro({ ...newIntro, keys: [] }))
                }
              />
            )
          })
        );
      }
    }
  ];

  const renderItem = useCallback(
    ({ item, drag }: { item: DataI; drag: any }) => (
      <Intro data={item} drag={drag} />
    ),
    []
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
      className="app flex-1"
    >
      <DragableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: DataI) => item.id!.toString()}
        onDragEnd={({ data }) => dispatch(setData(data))}
        className="px-4"
      />
    </Pressable>
  );
}
