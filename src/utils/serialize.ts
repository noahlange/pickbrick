import { type BrickItem, ColorType } from "../types";
import colors from "../data/colors.json";
import parts from "../data/parts.json";

type ExportData = string[];

export function exportList(bricks: BrickItem[]): ExportData {
  return bricks.map(({ partNum, colorId }) => {
    const part = (+partNum).toString(16).padStart(5, "0");
    const color = colorId.toString(16).toString().padStart(3, "0");
    return [part, color].join("");
  });
}

type ImportData = { part_num: number; color: number };

export function importList(list: string[]): ImportData[] {
  return list.filter(Boolean).reduce((res, val) => {
    const colorStart = val.length - 3;
    const part_num = parseInt(val.substring(0, colorStart), 16);
    const color = parseInt(val.substring(colorStart), 16);
    const value = { part_num, color };
    return res.concat(value);
  }, [] as ImportData[]);
}

export function hydrateList(imported: ImportData[]): BrickItem[] {
  const keyedByPart = Object.groupBy(parts, (v) => v.part_num);
  const keyedByColor = Object.groupBy(colors, (v) => v.id);

  return imported.map((item, i) => {
    const color = (keyedByColor[item.color] ?? [])[0];
    const brick = (keyedByPart[item.part_num] ?? [])[0];
    return {
      id: (i + 1).toString(),
      partName: brick.name,
      partNum: brick.part_num,
      colorId: color.id,
      colorRgb: color.rgb,
      colorType: color.type ?? ColorType.OPAQUE,
      colorName: color.name,
      completed: false,
    };
  });
}
