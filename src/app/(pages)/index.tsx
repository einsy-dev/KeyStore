import { Button } from "@react-navigation/elements";
import * as Clipboard from "expo-clipboard";
import * as SecureStore from "expo-secure-store";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

// const data: { [key: string]: { [key: string]: string } } = {
//   Gmail: {
//     password: "123456",
//     hashkey:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, debitis ullam officiis quibusdam aliquid facilis quae quidem deserunt nisi dicta eligendi voluptatum molestias temporibus eveniet unde adipisci similique delectus. Est!"
//   },
//   Github: {
//     name: "testy",
//     password: "testypass"
//   },
//   Npn: {
//     email: "einsy,dev@gmail.com",
//     pass: "123456"
//   }
// };

interface DataI {
  [key: string]: { [key: string]: string };
}

export default function App() {
  const [data, setData] = useState(JSON.parse(SecureStore.getItem("id") || ""));
  return (
    <ScrollView className="p-4">
      {Object.keys(data).map((key) => (
        <Website name={key} key={key}>
          {Object.keys(data[key]).map((key2) => (
            <Intro key={key2} name={key2} value={data[key][key2]} />
          ))}
          <Text>+</Text>
        </Website>
      ))}
      <AddNew setData={setData} />
    </ScrollView>
  );
}

function Website({ name, children }: { name: string; children: ReactNode }) {
  const [active, setActive] = useState(false);
  return (
    <View className="my-1 flex-row flex-wrap ">
      <TouchableHighlight
        onPress={() => setActive((prev) => !prev)}
        className="w-full"
      >
        <View className="border rounded">
          <Text className="px-4 py-1 text-lg">{name}</Text>
        </View>
      </TouchableHighlight>
      <View
        className={`flex flex-col gap-1 w-full mt-1 ${active ? "" : "hidden"}`}
      >
        {children}
      </View>
    </View>
  );
}

function Intro({ name, value }: { name: string; value: string }) {
  async function copy(text: string) {
    await Clipboard.setStringAsync(text);
  }
  return (
    <TouchableHighlight onPress={() => copy(value)} className=" pl-4 ">
      <View className="border rounded">
        <Text className="px-4 py-1 text-lg">{name}</Text>
      </View>
    </TouchableHighlight>
  );
}

function AddNew({
  className,
  setData
}: {
  className?: string;
  setData: Dispatch<SetStateAction<DataI>>;
}) {
  const [state, setState] = useState("");

  function submit(name: string) {
    setData((prev: any) => {
      prev[name] = {};
      SecureStore.setItem("id", JSON.stringify(prev));
      return { ...prev };
    });
  }
  return (
    <View className="w-full">
      <Text className="text-center">Add</Text>
      <TextInput
        className={"bg-red-200 w-full" + " " + className}
        keyboardType="numeric"
        value={state}
        onChangeText={setState}
      />
      <Button onPress={() => submit(state)}>Save</Button>
    </View>
  );
}
