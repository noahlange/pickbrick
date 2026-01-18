export enum ColorType {
  OPAQUE,
  TRANSPARENT,
  METALLIC,
  GLITTER,
}

export enum ColorFlag {
  NONE = 0,
  OLD = 0b01,
  SAND = 0b10,
  DARK = 0b100,
  COMMON = 0b1000,
}

export interface LegoColor {
  id: number;
  name: string;
  rgb: string;
  type?: ColorType;
  flags?: ColorFlag;
}

export interface LegoPart {
  part_num: string;
  name: string;
}

export interface BrickItem {
  id: string;
  partNum: string;
  partName?: string;
  colorId: number;
  colorName: string;
  colorRgb: string;
  colorType: ColorType;
  completed: boolean;
}
