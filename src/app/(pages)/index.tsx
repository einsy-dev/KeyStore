import { Intro } from "@/components/widgets";
import { selectData, setModal } from "@/lib/store/app";
import { PlusCircle } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  return (
    <ScrollView className="p-4">
      {data.map((el, index) => (
        <Intro key={index} data={el} />
      ))}

      <View className=" items-center">
        <TouchableOpacity
          onPress={() => dispatch(setModal({ active: true } as ModalI))}
          className="rounded-full"
        >
          <PlusCircle size={50} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
