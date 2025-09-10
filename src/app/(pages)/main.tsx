import { setMenu } from "@/lib/store/app";
import { FlatList, useMenu } from "@/widgets/main";
import React from "react";
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";

export default function Main() {
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
      <FlatList />
    </Pressable>
  );
}
