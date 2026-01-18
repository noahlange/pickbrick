import { ColorType } from "../types";

interface RecolorResponse {
  id: string;
  imageUrl: string;
  success: boolean;
  error?: string;
}

export type RecolorCallback = (imageUrl: string) => void;
export type ErrorCallback = (error: string) => void;

interface RecolorRequest {
  onSuccess: RecolorCallback;
  onError: ErrorCallback;
}

class ImageRecolorWorker {
  private worker: Worker | null = null;
  private pendingRequests: Map<string, RecolorRequest> = new Map();
  private requestCounter = 0;

  constructor() {
    this.initWorker();
  }

  private initWorker() {
    try {
      this.worker = new Worker(
        new URL("../workers/imageRecolor.worker.ts", import.meta.url),
        { type: "module" },
      );

      this.worker.addEventListener(
        "message",
        (event: MessageEvent<RecolorResponse>) => {
          const { id, imageUrl, success, error } = event.data;
          const callbacks = this.pendingRequests.get(id);

          if (callbacks) {
            if (success) {
              callbacks.onSuccess(imageUrl);
            } else {
              callbacks.onError(error || "Unknown error");
            }
            this.pendingRequests.delete(id);
          }
        },
      );

      this.worker.addEventListener("error", (error) => {
        console.error("Worker error:", error);
      });
    } catch (error) {
      console.error("Failed to initialize worker:", error);
    }
  }

  public async recolorImage(
    imageUrl: string,
    rgb: string,
    type: ColorType,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) =>
      this.startRecolor(imageUrl, rgb, type, resolve, reject),
    );
  }

  private startRecolor(
    imageUrl: string,
    rgb: string,
    type: ColorType,
    onSuccess: RecolorCallback,
    onError: ErrorCallback,
  ): void {
    if (!this.worker) {
      onError("Worker not initialized");
      return;
    }

    const id = `recolor-${this.requestCounter++}`;
    this.pendingRequests.set(id, { onSuccess, onError });
    this.worker.postMessage({ imageUrl, rgb, type, id });
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.pendingRequests.clear();
  }
}

// Create a singleton instance
let workerInstance: ImageRecolorWorker | null = null;

export function getImageRecolorWorker(): ImageRecolorWorker {
  if (!workerInstance) {
    workerInstance = new ImageRecolorWorker();
  }
  return workerInstance;
}

export function terminateImageRecolorWorker(): void {
  if (workerInstance) {
    workerInstance.terminate();
    workerInstance = null;
  }
}
