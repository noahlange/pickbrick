import { Avatar } from "@heroui/react";
import { useEffect, useState } from "react";
import { getImageRecolorWorker } from "../utils/ImageRecolorWorker";
import { ColorType } from "../types";

interface BrickPreviewProps {
  part: string;
  colorType: ColorType;
  rgb: string;
}

export function BrickPreview(props: BrickPreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getImageRecolorWorker()
      .recolorImage(`/parts/${props.part}.png`, props.rgb, props.colorType)
      .then(setImageUrl)
      .catch((error) => {
        console.error("Failed to recolor image:", error);
      });

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [props.part, props.rgb]);

  return (
    <Avatar
      className="m-auto w-auto h-full p-0 lg:p-2"
      radius="none"
      style={{ background: "none" }}
      imgProps={{ style: { objectFit: "contain" } }}
      src={imageUrl || `/parts/${props.part}.png`}
    />
  );
}
