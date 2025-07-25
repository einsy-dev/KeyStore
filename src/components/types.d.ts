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

interface ContextMenuI {
  active?: boolean;
  menu?: ContextMenuItemI[];
}
interface ContextMenuItemI {
  name: string;
  callback: (param?: any) => void;
}

interface ModalI {
  active: boolean;
  onSubmit?: (data: any) => void;
  data?: { [key: string]: string };
  required?: { [key: string]: boolean };
}

interface PopupI {
  active: boolean;
  message?: string;
  icon?: ReactNode;
}

interface ConfirmModalI {
  active: boolean;
  message?: string;
  options?: { text: string; onPress: () => void }[];
}
