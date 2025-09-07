export function parseIcons(Icons: any, itemsPerLine: number) {
  const IconsArr = Object.keys(Icons).reduce(
    (acc, key: string, index) => {
      const arrIndex = Math.floor(index / itemsPerLine);
      if (!Array.isArray(acc[arrIndex])) acc[arrIndex] = [];
      acc[arrIndex].push({ name: key, Icon: (Icons as any)[key] });
      return acc;
    },
    [[]] as { name: string; Icon: IconI }[][]
  );

  const lastArr = IconsArr[IconsArr.length - 1];
  if (lastArr.length < itemsPerLine) {
    IconsArr[IconsArr.length - 1] = lastArr.concat(Array(itemsPerLine - lastArr.length).fill({ name: "", Icon: "" }));
  }
  return IconsArr;
}
