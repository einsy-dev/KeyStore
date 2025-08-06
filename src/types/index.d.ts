interface KeyI {
  name: string;
  value: string;
  order: number;
}
type KeyListI = { [id: string]: KeyI };

interface DataI {
  name: string;
  order: number;
  icon?: ReactNode;
  keys: KeyListI;
}
type DataListI = { [id: string]: DataI };

interface ModalI {
  active: boolean;
  component?: ReactNode;
  position?: "top" | "bottom" | "center";
}
