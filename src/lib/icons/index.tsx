import {
  Discord,
  Drive,
  Github,
  Gitlab,
  Google,
  Instagram,
  Microsoft,
  Spotify,
  Telegram,
  WhatsApp
} from "@/assets/icons";
import {
  AtSign,
  Coins,
  DollarSign,
  Gamepad2,
  Globe,
  MonitorSmartphone,
  Phone,
  Send,
  Smartphone,
  SquareChevronRight,
  Zap
} from "lucide-react-native";

const iconsArr = [
  AtSign,
  Coins,
  DollarSign,
  Gamepad2,
  Globe,
  MonitorSmartphone,
  Phone,
  Send,
  Smartphone,
  SquareChevronRight,
  Zap,

  Discord,
  Drive,
  Github,
  Gitlab,
  Google,
  Instagram,
  Microsoft,
  Spotify,
  Telegram,
  WhatsApp
];

export const Icons: IconsI = iconsArr.reduce((acc, icon, index) => {
  acc[index] = { icon };
  return acc;
}, {} as IconsI);
