import { useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { exportList, compress } from "../utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Textarea,
} from "@heroui/react";

export function ExportForm() {
  const bricks = useAppSelector((state) => state.bricks.bricks);

  const compressed = useMemo(
    () => compress(exportList(bricks).map((v) => parseInt(v, 16))),
    [bricks],
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(compressed);
  };

  return (
    <Card shadow="none" className="grow basis-[50%]">
      <CardHeader className="font-semibold p-0 text-lg" as="h3">
        Export
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col h-full justify-items-stretch px-0">
        <Textarea
          labelPlacement="outside"
          readOnly
          classNames={{ inputWrapper: "grow font-mono", base: "h-full" }}
          defaultValue={compressed}
        />
      </CardBody>
      <CardFooter className="place-content-end">
        <Button onPress={handleCopy} size="sm" color="primary">
          Copy to Clipboard
        </Button>
      </CardFooter>
    </Card>
  );
}
