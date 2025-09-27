export function parseIcons(Icons: { [key: string]: IconI }, itemsPerLine: number, filter: string = "") {
  const IconsArr = Object.keys(Icons)
    .filter((key: string) => key.toLowerCase().includes(filter.toLowerCase()))
    .reduce(
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
