interface KeyElementI {
  label?: string;
  value: string;
  hide?: boolean | "random";
}

interface KeyI {
  name: KeyElementI;
  value: KeyElementI;
}
type KeyListI = { [id: string]: KeyI };

interface DataI {
  name: string;
  icon: ReactNode;
  keys: KeyListI;
}
type DataListI = { [id: string]: DataI };

type IconI = React.FC<SvgProps>;

type KeyModeT = "single" | "double";
