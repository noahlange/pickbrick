import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { importData } from "../store/brickSlice";
import { hydrateList, importList, extract } from "../utils";

export function ImportForm() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handlePaste = async () => {
    setValue(await navigator.clipboard.readText());
  };

  const handleImport = () => {
    const list = importList(extract(value));
    dispatch(importData(hydrateList(list)));
  };

  return (
    <Card shadow="none" className="grow basis-[50%]">
      <CardHeader className="font-semibold p-0 text-lg" as="h3">
        Import
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col h-full justify-items-stretch px-0">
        <Textarea
          placeholder="Paste to import list data."
          className="font-mono"
          spellCheck="false"
          classNames={{ inputWrapper: "grow", base: "h-full" }}
          rows={5}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </CardBody>
      <CardFooter className="place-content-end gap-3">
        <Button
          variant="light"
          onPress={handlePaste}
          size="sm"
          color="secondary"
        >
          Paste From Clipboard
        </Button>
        <Button
          onPress={handleImport}
          isDisabled={value == ""}
          size="sm"
          color="primary"
        >
          Import
        </Button>
      </CardFooter>
    </Card>
  );
}
