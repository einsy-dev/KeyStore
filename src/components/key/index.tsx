import { setMenu } from "@/lib/store/app";
import { CopyText } from "@/shared";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useMenu } from "./useMenu";

export function Key({ data }: { data: KeyI }) {
  const dispatch = useDispatch();
  const menu = useMenu();
  return (
    <TouchableOpacity
      onLongPress={(e) => {
        e.stopPropagation();
        dispatch(
          setMenu({
            active: true,
            menu
          })
        );
      }}
    >
      <CopyText className="text-2xl">{data.name}</CopyText>
    </TouchableOpacity>
  );
}
