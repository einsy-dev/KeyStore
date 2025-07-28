import { IntroList } from "@/components/IntroList";
import { ContextMenu, Form } from "@/components/widgets";
import { setModal } from "@/lib/store/app";
import { createIntro } from "@/lib/store/data";
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";

export default function App() {
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
                clear
              />
            )
          })
        );
      }
    }
  ];

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
      <IntroList />
    </Pressable>
  );
}
