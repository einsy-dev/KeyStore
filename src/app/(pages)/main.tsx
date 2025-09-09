import Storage from "@/lib/storage";
import { setMenu } from "@/lib/store/app";
import { FlatList, useMenu } from "@/widgets/main";
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";
export default function Main() {
  const dispatch = useDispatch();
  const menu = useMenu();

  useEffect(() => {
    (async () => {
      // await Storage.createGroup({
      //   name: "Test2",
      //   icon: "App"
      // });
      // for (let key of clg[0].keys) {
      //   await Storage.deleteKey(clg[0].id, key.id);
      // }
      await Storage.setIntex([{"icon": "App", "id": "ajup3v8ih24qer5j6gos4bgs", "keys": [], "name": "Test2"}, {"icon": "App", "id": "h2qh4u5b8dryvyqkvoo62ni7", "keys": [], "name": "Test2"}]);
      // await Storage.setIntex([{ icon: "App", id: "ajup3v8ih24qer5j6gos4bgs", keys: [], name: "Test" }]);
      await Storage.getGroups().then(console.log);
    })();
  }, []);

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
