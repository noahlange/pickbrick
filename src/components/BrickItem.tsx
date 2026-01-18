import { Button, Card } from "@heroui/react";
import { type BrickItem as BrickType } from "../types";
import { BrickPreview } from "./BrickPreview";
import { ShowIf } from "./ShowIf";
import * as BI from "react-bootstrap-icons";

interface BrickItemProps {
  brick: BrickType;
  onCheck: () => void;
  onDelete: () => void;
}

export default function BrickItem({ brick, ...props }: BrickItemProps) {
  return (
    <div className="relative flex">
      <ShowIf value={brick.completed}>
        <div className="absolute top-1 left-1 z-10">
          <Button
            className="rounded-full"
            variant="light"
            size="sm"
            color="primary"
            onPress={() => props.onCheck()}
            isIconOnly
          >
            <BI.ArrowCounterclockwise />
          </Button>
        </div>
        <div className="absolute top-1 right-1 z-10">
          <Button
            className="rounded-full"
            variant="light"
            size="sm"
            color="danger"
            onPress={() => props.onDelete()}
            isIconOnly
          >
            <BI.Trash />
          </Button>
        </div>
      </ShowIf>
      <Card
        className="grow"
        isHoverable
        isPressable={!brick.completed}
        isDisabled={brick.completed}
        key={brick.id}
        onPress={() => props.onCheck()}
      >
        <div className="flex flex-row items-center h-24 p-3 gap-2">
          <div className="shrink-0 basis-12 lg:basis-24 h-full">
            <BrickPreview
              part={brick.partNum}
              rgb={brick.colorRgb}
              colorType={brick.colorType}
            />
          </div>
          <div className="grow flex flex-col self-center text-left leading-4">
            <h3
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="text-sm lg:text-medium font-bold max-w-[80%]"
            >
              {brick.partName}
            </h3>
            <span className="text-xs lg:text-sm overflow-hidden whitespace-nowrap text-ellipsis">
              {brick.colorName}
            </span>
            <span className="text-xs text-default-500">№ {brick.partNum}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
