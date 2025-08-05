interface ContextMenuI {
  name: string;
  menu: ContextMenuItemI[];
}

interface ContextMenuItemI {
  name: string;
  icon: ReactNode;
  callback: (param?: any) => void;
}
