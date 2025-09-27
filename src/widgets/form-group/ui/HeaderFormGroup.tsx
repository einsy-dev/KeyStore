import { GoBack } from "@/shared/ui/Header/GoBack";
import { Header } from "@/shared/ui/Header/Header";
import { Submit } from "@/shared/ui/Header/Submit";

export function HeaderFormGroup() {
  return (
    <Header>
      <GoBack />
      <Submit />
    </Header>
  );
}
