import * as IconsAsset from "@/assets/icons";

export const Icons: IconsI = Object.values(IconsAsset).reduce(
  (acc, icon, index) => {
    acc[index] = { icon };
    return acc;
  },
  {} as IconsI
);
