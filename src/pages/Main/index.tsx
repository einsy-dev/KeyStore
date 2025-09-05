import { setMenu } from "@/lib/store/app";
import { selectData } from "@/lib/store/data";
import React from "react";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "./FlatList";
import { useMenu } from "./useMenu";

export function Main() {
  const data = useSelector(selectData);
  const dispatch = useDispatch();
  const menu = useMenu();

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
      <FlatList data={data} />
    </Pressable>
  );
}
