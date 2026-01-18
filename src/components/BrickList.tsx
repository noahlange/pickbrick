import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeBrick, toggleBrickComplete } from "../store/brickSlice";
import BrickItem from "./BrickItem";
import { Alert, Card } from "@heroui/react";

export default function BrickList() {
  const bricks = useAppSelector((state) => state.bricks.bricks);
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => dispatch(removeBrick(id));
  const handleCheck = (id: string) => dispatch(toggleBrickComplete(id));

  if (bricks.length === 0) {
    return (
      <Card shadow="none">
        <Alert hideIconWrapper color="default">
          <div className="py-3">
            <h3 className="text-lg font-semibold">No bricks picked.</h3>
            <p>Get pickin'!</p>
          </div>
        </Alert>
      </Card>
    );
  }

  return (
    <div className="grow brick-list gap-3">
      {bricks.map((item) => (
        <BrickItem
          key={item.id}
          brick={item}
          onDelete={() => handleDelete(item.id)}
          onCheck={() => handleCheck(item.id)}
        />
      ))}
    </div>
  );
}
