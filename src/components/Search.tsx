import { Autocomplete, AutocompleteItem, Avatar } from "@heroui/react";
import parts from "../data/parts.json";
import { type Key } from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function Search(props: SearchProps) {
  return (
    <Autocomplete
      classNames={{ base: "grow-2 basis-full" }}
      label="Search Parts"
      defaultItems={parts}
      onSelectionChange={props.onChange as (v: Key | null) => void}
      value={props.value}
      variant="bordered"
      itemHeight={64}
    >
      {(part) => (
        <AutocompleteItem textValue={part.name} key={part.part_num}>
          <div className="flex gap-3 items-center dark:text-white">
            <Avatar
              className="w-16"
              radius="none"
              style={{ background: "none" }}
              imgProps={{ style: { objectFit: "contain" } }}
              src={`/pickbrick/parts/${part.part_num}.png`}
            />
            <div className="max-h-12 flex flex-col flex-1">
              <h3 className="max-h-6 text-small overflow-hidden">
                {part.name}
              </h3>
              <div className="text-tiny text-default-500">{part.part_num}</div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
