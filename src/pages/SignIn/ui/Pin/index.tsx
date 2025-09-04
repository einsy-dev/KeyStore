import { ShakeDecorator } from "@/shared/decorators";
import { Item } from "./Item";

export function Pin({ status = null, value }: { status?: "success" | "error" | null; value: string }) {
  return (
    <ShakeDecorator
      active={status === "error" ? true : false}
      className="flex-1 flex-row items-center justify-center gap-6"
    >
      {Array(4)
        .fill("")
        .map((_, index) => (
          <Item key={index} value={value[index]} status={status} />
        ))}
    </ShakeDecorator>
  );
}
