import { GoBack } from "@/shared/ui/Header/GoBack";
import { Header } from "@/shared/ui/Header/Header";
import { Submit } from "@/shared/ui/Header/Submit";

export function HeaderFormKey() {
  return (
    <Header>
      <GoBack />
      <Submit />
    </Header>
  );
}
