interface KeyI {
  id: string;
  name: string;
  value: string;
  order: number;
  icon?: ReactNode;
}
type KeyListI = { [id: string]: KeyI };

interface DataI {
  id: string;
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
