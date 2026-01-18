import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@heroui/react";

import { colors } from "../data";
import { Swatch } from "./Swatch";
import { ColorFlag, ColorType, type LegoColor } from "../types";
import { useMemo } from "react";

interface ColorPickerProps {
  value: number | null;
  onChange: (color: number | null) => void;
}

function getColorOption(color: LegoColor) {
  return (
    <AutocompleteItem
      key={color.id}
      textValue={color.name}
      startContent={
        <Swatch
          className="w-8 h-8 rounded-full overflow-hidden border-1 border-gray-300"
          rgb={color.rgb!}
          type={color.type}
        />
      }
    >
      {color.name}
    </AutocompleteItem>
  );
}

function hasType(type: ColorType) {
  return (color: LegoColor) =>
    color.type == type || (type === ColorType.OPAQUE && !color.type);
}

function hasFlag(flag: ColorFlag) {
  return (color: LegoColor) => ((color.flags ?? ColorFlag.NONE) & flag) == flag;
}

export function ColorPicker(props: ColorPickerProps) {
  const opaque = useMemo(() => colors.filter(hasType(ColorType.OPAQUE)), []);

  const old = useMemo(() => colors.filter(hasFlag(ColorFlag.OLD)), []);
  const top = useMemo(() => colors.filter(hasFlag(ColorFlag.COMMON)), []);

  const trans = useMemo(
    () => colors.filter(hasType(ColorType.TRANSPARENT)),
    [],
  );

  const metallic = useMemo(
    () => colors.filter(hasType(ColorType.METALLIC)),
    [],
  );

  const sand = useMemo(() => colors.filter(hasFlag(ColorFlag.SAND)), []);

  return (
    <Autocomplete
      label="Color"
      classNames={{ base: "lg:grow lg:basis-[24rem]" }}
      itemHeight={44}
      selectedKey={props.value}
      onSelectionChange={(e) => props.onChange(e as number)}
    >
      <AutocompleteSection showDivider title="Top 10">
        {top.map(getColorOption)}
      </AutocompleteSection>
      <AutocompleteSection showDivider title="Opaque">
        {opaque.map(getColorOption)}
      </AutocompleteSection>
      <AutocompleteSection showDivider title="Retired">
        {old.map(getColorOption)}
      </AutocompleteSection>
      <AutocompleteSection showDivider title="Sand">
        {sand.map(getColorOption)}
      </AutocompleteSection>
      <AutocompleteSection title="Transparent">
        {trans.map(getColorOption)}
      </AutocompleteSection>
      <AutocompleteSection title="Metallic">
        {metallic.map(getColorOption)}
      </AutocompleteSection>
    </Autocomplete>
  );
}
