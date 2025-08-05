import {
	BadgeDollarSign,
	EuroIcon,
	Gamepad2,
	Globe,
	Joystick,
	LetterTextIcon,
	LucideIcon,
	Notebook,
	Pencil,
	SquareChevronRight
} from "lucide-react-native";

interface IconsI {
  [key: string]: {
    title: string;
    icon: LucideIcon;
  };
}

export const Icons: IconsI = {
  0: {
    title: "",
    icon: Globe
  },
  1: {
    title: "",
    icon: SquareChevronRight
  },
  2: {
    title: "",
    icon: Gamepad2
  },
  3: {
    title: "",
    icon: Notebook
  },
  4: {
    title: "",
    icon: Pencil
  },
  5: {
    title: "",
    icon: Joystick
  },
  6: {
    title: "",
    icon: BadgeDollarSign
  },
  7: {
    title: "",
    icon: Notebook
  },
  8: {
    title: "",
    icon: Pencil
  },
  9: {
    title: "",
    icon: Joystick
  },
  10: {
    title: "",
    icon: EuroIcon
  },
  11: {
    title: "",
    icon: LetterTextIcon
  }
};
