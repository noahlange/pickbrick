import { ColorType } from "../types";

interface RecolorMessage {
  imageUrl: string;
  type: ColorType;
  rgb: string;
  id: string;
}

interface RecolorResponse {
  id: string;
  imageUrl: string;
  success: boolean;
  error?: string;
}

// Convert hex RGB to individual color components
function parseRgb(rgb: string): { r: number; g: number; b: number } {
  const hex = rgb.replace("#", "");
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

// Recolor a grayscale image with the specified RGB color
async function recolorImage(
  imageUrl: string,
  rgb: string,
  type: ColorType,
): Promise<string> {
  // Fetch the image
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const imageBitmap = await createImageBitmap(blob);

  // Create an offscreen canvas
  const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Draw the original image
  ctx.drawImage(imageBitmap, 0, 0);

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Parse the target color
  const targetColor = parseRgb(rgb);

  // Recolor the image
  // For each pixel, we multiply the grayscale value by the target color
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i]; // R channel (assuming grayscale, all channels are the same)
    const alpha = data[i + 3]; // Alpha channel

    // Calculate the intensity factor (0-1)
    const intensity = gray / 255;

    // Apply color based on intensity
    // Dark areas stay dark, light areas get the full color
    data[i] = targetColor.r * intensity; // R
    data[i + 1] = targetColor.g * intensity; // G
    data[i + 2] = targetColor.b * intensity; // B
    // Keep original alpha
    data[i + 3] =
      type === ColorType.TRANSPARENT ? (1 - intensity / 3) * alpha : alpha;
  }

  // Put the modified image data back
  ctx.putImageData(imageData, 0, 0);

  // Convert to blob and create object URL
  const resultBlob = await canvas.convertToBlob({ type: "image/png" });
  return URL.createObjectURL(resultBlob);
}

// Handle messages from the main thread
self.addEventListener(
  "message",
  async (event: MessageEvent<RecolorMessage>) => {
    const { imageUrl, rgb, id, type } = event.data;

    try {
      const recoloredUrl = await recolorImage(imageUrl, rgb, type);

      const response: RecolorResponse = {
        id,
        imageUrl: recoloredUrl,
        success: true,
      };

      self.postMessage(response);
    } catch (error) {
      const response: RecolorResponse = {
        id,
        imageUrl: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };

      self.postMessage(response);
    }
  },
);

export {};
