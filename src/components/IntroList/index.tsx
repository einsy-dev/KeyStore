import { selectData, setData } from "@/lib/store/data";
import React from "react";
import DragableFlatList, {
  ScaleDecorator
} from "react-native-draggable-flatlist";
import { useDispatch, useSelector } from "react-redux";
import { Intro } from "./Intro";

export function IntroList() {
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  const renderItem = ({ item, drag }: { item: DataI; drag: any }) => (
    <ScaleDecorator activeScale={1.05}>
      <Intro data={item} drag={drag} />
    </ScaleDecorator>
  );

  return (
    <DragableFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: DataI) => String(item.id + item.name)}
      onDragEnd={({ data }) =>
        new Promise(() => setTimeout(() => dispatch(setData(data))))
      }
      className="px-4"
    />
  );
}
