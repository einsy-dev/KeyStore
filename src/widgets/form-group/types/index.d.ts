interface SelectIconI {
  onSelect: (id: string) => void;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

interface RenderItemI {
  item: {
    id: string;
    icon: IconI;
  };
}

interface RenderSection {
  section: {
    title: string;
  };
}
