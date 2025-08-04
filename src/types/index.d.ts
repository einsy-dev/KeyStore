interface KeyI {
  id: string;
  name: string;
  value: string;
}
type KeyListI = { [id: string]: KeyI };

interface DataI {
  id: string;
  name: string;
  keys: KeyListI;
}
type DataListI = { [id: string]: DataI };

interface ModalI {
  active: boolean;
  component?: ReactNode;
  position?: "top" | "bottom" | "center";
}
