type KeyI = {
  id?: number;
  name: string;
  value: string;
};

interface DataI {
  id?: number;
  name: string;
  keys: KeyI[];
}

interface ModalI {
  active: boolean;
  component?: ReactNode;
  position?: "top" | "bottom" | "center";
}
