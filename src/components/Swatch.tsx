import { ColorType } from "../types";
import { ShowIf } from "./ShowIf";

interface SwatchProps {
  rgb: string;
  type?: ColorType;
  className?: string;
}

export function Swatch(props: SwatchProps) {
  return (
    <div className={`relative ${props.className}`}>
      <ShowIf value={props.type == ColorType.METALLIC}>
        <img
          style={{ mixBlendMode: "overlay" }}
          className="absolute w-full h-full"
          src="/pickbrick/swatch-metallic.png"
        />
      </ShowIf>
      <ShowIf value={props.type == ColorType.TRANSPARENT}>
        <img
          style={{ mixBlendMode: "soft-light" }}
          className="absolute w-full h-full"
          src="/pickbrick/swatch-transparent.png"
        />
      </ShowIf>
      <div
        className="w-full h-full block"
        style={{ backgroundColor: `#${props.rgb}` }}
      />
    </div>
  );
}
