interface KeyElementI {
  label?: string;
  value: string;
  hide?: boolean | "random";
}

interface KeyI {
  name: KeyElementI;
  value: KeyElementI;
  order?: number;
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
