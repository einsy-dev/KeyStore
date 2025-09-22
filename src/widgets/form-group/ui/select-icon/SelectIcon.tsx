import { TextInput } from "@/shared/ui";
import { Search } from "lucide-react-native";
import { useCallback } from "react";
import { SectionList, Text, View } from "react-native";

interface SelectIconI {
  onSelect: (id: string) => void;
}

interface RenderItemI {
  item: string;
}

interface RenderSection {
  section: {
    title: string;
  };
}

const data = [{ title: "", data: [] }];

export function SelectIcon({ onSelect }: SelectIconI) {
  const renderSection = useCallback(({ section: { title } }: RenderSection) => {
    return <Text>{title}</Text>;
  }, []);

  const renderItem = useCallback(({ item }: RenderItemI) => {
    return <Text>{item}</Text>;
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-row">
        <TextInput />
        <Search width={35} height={35} />
      </View>
      <SectionList
        sections={data}
        renderItem={renderItem}
        renderSectionHeader={renderSection}
        keyExtractor={(item: string, index: number) => item + "-" + index}
      />
    </View>
  );
}
