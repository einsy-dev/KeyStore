import { Intro } from "@/components/widgets";
import { selectData, setModal } from "@/lib/store/app";
import { SquarePlus } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  return (
    <ScrollView className="p-4 ">
      {Object.keys(data).map((key) => (
        <Intro name={key} key={key} data={data[key]} />
      ))}
      <TouchableOpacity
        onPress={() =>
          dispatch(setModal({ active: true, type: "Intro" } as ModalI))
        }
      >
        <SquarePlus />
      </TouchableOpacity>
    </ScrollView>
  );
}
