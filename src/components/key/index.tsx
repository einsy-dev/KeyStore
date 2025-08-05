import { ContextMenu } from "@/components/contextMenu";
import { setModal } from "@/lib/store/app";
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
          setModal({
            active: true,
            component: <ContextMenu name="" menu={menu} />,
            position: "bottom"
          })
        );
      }}
    >
      <CopyText className="text-2xl">{data.name}</CopyText>
    </TouchableOpacity>
  );
}
