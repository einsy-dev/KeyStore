import { useMyContext } from "@/lib/store";
import { Modal } from "@/shared/Modal";
import { Intro, IntroItem, NewIntro, NewIntroItem } from "@/widgets/index";
import { CirclePlus } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableHighlight } from "react-native";

export default function App() {
  const [modal, setModal] = useState(false); // false or key
  const [key, setKey] = useState("");
  const { context, setIntro, setIntroItem } = useMyContext();

  return (
    <>
      <ScrollView className="p-4 ">
        {Object.keys(context.data).map((key) => (
          <Intro name={key} key={key} setKey={setKey}>
            {Object.keys(context.data[key]).map((key2) => (
              <IntroItem
                key={key2}
                name={key2}
                value={context.data[key][key2]}
                className="[&>*]:bg-red-200"
              />
            ))}
          </Intro>
        ))}
        <TouchableHighlight
          underlayColor="none"
          className="py-2 w-full items-center"
          onPress={() => setModal(true)}
        >
          <CirclePlus size={"50px"} />
        </TouchableHighlight>
      </ScrollView>
      <Modal
        active={modal ? true : false}
        setActive={setModal}
        className="gap-4"
      >
        <NewIntro onSubmit={setIntro} />
      </Modal>

      <Modal
        active={key ? true : false}
        setActive={() => {
          setKey("");
        }}
        className="gap-4"
      >
        <NewIntroItem
          onSubmit={(...newData) => {
            setIntroItem(key, ...newData);
            setKey("");
          }}
        />
      </Modal>
    </>
  );
}
