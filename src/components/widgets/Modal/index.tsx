import { selectModal, setModal } from "@/lib/store/app";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Confirm } from "./Confirm";
import { NewIntro } from "./NewIntro";
import { NewIntroItem } from "./NewIntroItem";

export function Modal() {
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();
  return (
    <>
      {modal.active ? (
        <TouchableHighlight
          className="absolute bg-[rgba(0_0_0_0.5)] inset-0 items-center justify-center px-2"
          onPress={() => dispatch(setModal({ active: false }))}
        >
          <TouchableWithoutFeedback>
            <View className="w-full">
              <SwitchModal modal={modal} />
            </View>
          </TouchableWithoutFeedback>
        </TouchableHighlight>
      ) : null}
    </>
  );
}

function SwitchModal({ modal }: { modal: ModalI }) {
  switch (modal.type) {
    case "Intro":
      return <NewIntro modal={modal} />;
    case "IntroItem":
      return <NewIntroItem modal={modal} />;
    case "Confirm":
      return <Confirm />;
    default:
      break;
  }
}
