import { useAppDispatch } from "../store/hooks";
import { addBrick } from "../store/brickSlice";
import { ColorType, type BrickItem } from "../types";
import { useMemo, useState } from "react";
import { Search } from "./Search";
import { ColorPicker } from "./ColorPicker";
import { Button } from "@heroui/react";
import * as BI from "react-bootstrap-icons";
import { parts, colors } from "../data";

export function AddBrickForm() {
  const dispatch = useAppDispatch();

  const [color, setColor] = useState<number | null>(1);
  const [part, setPart] = useState<string | null>(null);
  const handleAdd = (item: Omit<BrickItem, "id">) => dispatch(addBrick(item));

  const brick: Omit<BrickItem, "id"> | null = useMemo(() => {
    const colorData = colors.find((f) => f.id == color)!;
    const partData = parts.find((f) => f.part_num == part)!;
    if (colorData && partData) {
      return {
        colorId: colorData.id,
        partNum: partData.part_num,
        colorName: colorData.name,
        colorRgb: colorData.rgb,
        colorType: colorData.type ?? ColorType.OPAQUE,
        partName: partData.name,
        count: 1,
        completed: false,
      };
    }
    return null;
  }, [color, part]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-3">
      <Search value={part!} onChange={setPart} />
      <ColorPicker value={color} onChange={setColor} />
      <Button
        size="lg"
        className="w-full lg:w-auto"
        isDisabled={brick == null}
        onPress={() => handleAdd(brick!)}
        color="primary"
        variant="solid"
      >
        Add
        <div className="text-2xl">
          <BI.PlusCircleFill />
        </div>
      </Button>
    </div>
  );
}
