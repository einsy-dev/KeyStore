interface MenuI {
  active: boolean;
  menu?: MenuItemI[];
}

interface MenuItemI {
  name: string;
  icon: ReactNode;
  callback: (param?: any) => void;
}
