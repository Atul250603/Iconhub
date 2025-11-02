// utils/svg/download.ts
import { canvasID } from "@/constants";
import { handleError } from "../logs/error";

export const getSVGElement = (): SVGElement | null => {
  const container = document.getElementById(canvasID);
  return container?.querySelector("svg") as SVGElement | null;
};

export const getSVGString = (): string | undefined => {
  const svgEl = getSVGElement();
  if (!svgEl) {
    return handleError<string | undefined>("Failed to get SVG string: No SVG element found", undefined);
  }

  // Clone to avoid modifying original
  const clone = svgEl.cloneNode(true) as SVGElement;

  // Serialize to string
  return new XMLSerializer().serializeToString(clone);
};

export const copySVGToClipboard = async (): Promise<boolean> => {
  try {
    const svgString = getSVGString();
    if (!svgString) {
      throw new Error("Failed to copy SVG: No SVG string returned");
    }

    await navigator.clipboard.writeText(svgString);
    return true;
  } catch (err) {
    return handleError<boolean>(`Failed to copy SVG: ${err instanceof Error ? err.message : String(err)}`, false);
  }
};

export const downloadSVG = (filename: string = "icon.svg"): boolean => {
  try {
    const svgString = getSVGString();
    if (!svgString) {
      throw new Error("Failed to download SVG: No SVG string returned");
    }

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    return handleError<boolean>(`Failed to download SVG: ${err instanceof Error ? err.message : String(err)}`, false);
  }
};

export const downloadAsPNG = async (
  filename: string = "icon.png"
): Promise<boolean> => {
  try {
    const svgEl = getSVGElement();
    if (!svgEl) {
      return handleError<boolean>("Failed to convert SVG to PNG: No SVG element found", false);
    }

    // Get SVG dimensions
    const width = parseInt(svgEl.getAttribute("width") || "24");
    const height = parseInt(svgEl.getAttribute("height") || "24");

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return handleError<boolean>("Failed to convert SVG to PNG: No canvas context", false);
    }

    // Create image from SVG
    const svgString = getSVGString();
    if (!svgString) {
      return handleError<boolean>("Failed to convert SVG to PNG: No SVG string returned", false);
    }
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        try {
          // Draw image on canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Download as PNG
          canvas.toBlob((blob) => {
            if (!blob) {
              URL.revokeObjectURL(url);
              resolve(handleError<boolean>("Failed to convert SVG to PNG: No blob returned", false));
              return;
            }
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            URL.revokeObjectURL(url);
            resolve(true);
          }, "image/png");
        } catch (err) {
          URL.revokeObjectURL(url);
          resolve(handleError<boolean>(`Failed to convert SVG to PNG: ${err instanceof Error ? err.message : String(err)}`, false));
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(handleError<boolean>("Failed to convert SVG to PNG: Failed to load SVG as image", false));
      };

      img.src = url;
    });
  } catch (err) {
    return handleError<boolean>(`Failed to convert SVG to PNG: ${err instanceof Error ? err.message : String(err)}`, false);
  }
};