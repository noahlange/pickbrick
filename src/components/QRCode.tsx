import { useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { compress, exportList } from "../utils";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import QR from "react-qr-code";

export function QRCode() {
  const bricks = useAppSelector((state) => state.bricks.bricks);

  const compressed = useMemo(
    () => compress(exportList(bricks).map((v) => parseInt(v, 16))),
    [bricks],
  );

  return (
    <Card shadow="none" className="grow min-w-64">
      <CardHeader className="font-semibold p-0 text-lg" as="h3">
        QR Code
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col h-full justify-items-stretch px-0 items-center">
        <QR value={`https://noahlange.github.io/pickbrick?q=${compressed}`} />
      </CardBody>
    </Card>
  );
}
