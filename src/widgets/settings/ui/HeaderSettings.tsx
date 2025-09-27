import { GoBack } from "@/shared/ui/Header/GoBack";
import { Header } from "@/shared/ui/Header/Header";
import { ChangeLanguage } from "./ChangeLanguage";

export function HeaderSettings() {
  return (
    <Header>
      <GoBack />
      <ChangeLanguage />
    </Header>
  );
}
