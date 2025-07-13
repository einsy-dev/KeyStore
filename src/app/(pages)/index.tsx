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
        {Object.keys(context).map((key) => (
          <Intro name={key} key={key} setKey={setKey}>
            {Object.keys(context[key]).map((key2) => (
              <IntroItem key={key2} name={key2} value={context[key][key2]} />
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
      <Modal active={modal ? true : false} setActive={setModal}>
        <NewIntro onSubmit={setIntro} />
      </Modal>
      <Modal
        active={key ? true : false}
        setActive={() => {
          setKey("");
        }}
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
