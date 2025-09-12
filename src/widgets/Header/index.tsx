import { useColor } from "@/hooks/useColor";
import { selectHeader, setHeader } from "@/lib/store/app";
import { usePathname, useRouter } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ChangeLanguage } from "../settings";

export function Header() {
  const { color } = useColor();
  const router = useRouter();
  const header = useSelector(selectHeader);
  const pathName = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setHeader({}));
    };
  }, [dispatch, pathName]);
  console.log(pathName);

  return (
    <View className="card flex-row justify-between items-center px-4">
      <Pressable onPress={() => router.back()}>
        <View className="p-2">
          <ChevronLeft color={color} size={30} />
        </View>
      </Pressable>
      <Pressable>
        <View className="p-2">
          {pathName === "/settings" ? (
            <ChangeLanguage />
          ) : header.onSubmit ? (
            <Pressable onPress={header.onSubmit}>
              <Check color={color} size={30} />
            </Pressable>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}
