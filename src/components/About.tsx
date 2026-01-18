import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import * as BI from "react-bootstrap-icons";

export function About() {
  return (
    <Card>
      <CardHeader as="h3" className="text-xl font-semibold p-3 justify-between">
        PickBrick
        <BI.Bricks />
      </CardHeader>
      <Divider />
      <CardBody className="p-3">
        <p className="text-md mb-2">
          Once upon a time, I was here and using my phone's notes app to track
          which bricks I needed to pick/had picked from the bulk bin.
        </p>
        <p className="text-sm">
          (In so doing I missed like half-a-dozen of the ones I was actually
          looking for.)
        </p>
      </CardBody>
    </Card>
  );
}
