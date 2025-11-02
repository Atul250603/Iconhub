import { canvasID } from "@/constants";
import type { ShapeConfig, SvgConfig, ViewBoxDimensions } from "@/types";
import type { GradientConfig } from "@/types";
import { handleError } from "@/utils/logs/error";

export const ensureBackgroundRect = (
  svgEl: SVGElement,
  myID: string,
  svgConfig: SvgConfig
) => {
  try {
    if (!svgEl) {
      return handleError("ensureBackgroundRect: No SVG element provided", null);
    }

    // look for existing background rect
    let bgRect = svgEl.querySelector(`#${myID}-bg-rect`);
    if (!bgRect) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      const inset = svgConfig.background.strokeWidth / 2;

      rect.setAttribute("id", `${myID}-bg-rect`);
      rect.setAttribute("x", inset.toString());
      rect.setAttribute("y", inset.toString());
      rect.setAttribute(
        "width",
        `calc(100% - ${svgConfig.background.strokeWidth}px)`
      );
      rect.setAttribute(
        "height",
        `calc(100% - ${svgConfig.background.strokeWidth}px)`
      );
      rect.setAttribute("fill", "transparent");

      // find defs if any, insert after it, else prepend
      const defs = svgEl.querySelector("defs");
      if (defs && defs.nextSibling) {
        svgEl.insertBefore(rect, defs.nextSibling);
      } else {
        svgEl.insertBefore(rect, svgEl.firstChild);
      }
      bgRect = rect;
    }

    return bgRect;
  } catch (err) {
    return handleError(
      `ensureBackgroundRect: ${err instanceof Error ? err.message : String(err)}`,
      null
    );
  }
};

export const createNewGradient = (
  gradientConfig: GradientConfig,
  id: string,
  viewBoxDimensions: ViewBoxDimensions
) => {
  try {
    const newGradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      gradientConfig.type === "linear" ? "linearGradient" : "radialGradient"
    );
    newGradient.setAttribute("id", id);
    newGradient.setAttribute("gradientUnits", "userSpaceOnUse");
    if (gradientConfig.type === "linear") {
      newGradient.setAttribute("x1", "0");
      newGradient.setAttribute("y1", "0");
      newGradient.setAttribute("x2", viewBoxDimensions.width.toString());
      newGradient.setAttribute("y2", viewBoxDimensions.height.toString());
      newGradient.setAttribute(
        "gradientTransform",
        `rotate(${gradientConfig.angle}, ${viewBoxDimensions.width / 2}, ${viewBoxDimensions.height / 2})`
      );
    } else {
      newGradient.setAttribute("cx", (viewBoxDimensions.width / 2).toString());
      newGradient.setAttribute("cy", (viewBoxDimensions.height / 2).toString());
      newGradient.setAttribute("r", (viewBoxDimensions.width / 2).toString());
      newGradient.setAttribute("fx", (viewBoxDimensions.width / 2).toString());
      newGradient.setAttribute("fy", (viewBoxDimensions.height / 2).toString());
    }
    gradientConfig.colors.forEach((color) => {
      try {
        const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        if (!isNaN(color.left) && color.value) {
          stop.setAttribute("offset", `${color.left}%`);
          stop.setAttribute("stop-color", color.value);
          newGradient.appendChild(stop);
        }
      } catch (err) {
        handleError(
          `createNewGradient: Failed to create gradient stop: ${err instanceof Error ? err.message : String(err)}`,
          undefined
        );
      }
    });
    return newGradient;
  } catch (err) {
    handleError(
      `createNewGradient: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
    throw err; // Re-throw if caller needs to handle
  }
};

export const setGradient = (
  svgEl: SVGElement,
  gradientConfig: GradientConfig,
  id: string,
  viewBoxDimensions: ViewBoxDimensions
) => {
  try {
    if (!svgEl) {
      return handleError("setGradient: No SVG element provided", undefined);
    }

    let defs = svgEl.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svgEl.insertBefore(defs, svgEl.firstChild);
    }
    const isExisting = defs.querySelector(`#${id}`);
    const newGradient = createNewGradient(gradientConfig, id, viewBoxDimensions);
    if (isExisting) {
      defs.removeChild(isExisting);
    }
    defs.appendChild(newGradient);
  } catch (err) {
    handleError(
      `setGradient: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
  }
};

export const setBackgroundRect = (
  svgEl: SVGElement,
  myID: string,
  svgConfig: SvgConfig,
  viewBoxDimensions: ViewBoxDimensions
) => {
  try {
    if (!svgEl) {
      return handleError("setBackgroundRect: No SVG element provided", undefined);
    }
    const bgRect = svgEl.querySelector(`#${myID}-bg-rect`);
    if (!bgRect) {
      return handleError("setBackgroundRect: Background rect not found", undefined);
    }

    bgRect.setAttribute("rx", svgConfig.background.rx.toString());
    bgRect.setAttribute(
      "stroke-width",
      svgConfig.background.strokeWidth.toString()
    );

    if (svgConfig.background.fill.mode === "solid") {
      bgRect.setAttribute("fill", svgConfig.background.fill.value);
    } else if (svgConfig.background.fill.gradient) {
      setGradient(
        svgEl,
        svgConfig.background.fill.gradient,
        `${myID}-bg-fill-gradient`,
        viewBoxDimensions
      );
      bgRect.setAttribute("fill", `url(#${myID}-bg-fill-gradient)`);
    }

    if (svgConfig.background.stroke.mode === "solid") {
      bgRect.setAttribute("stroke", svgConfig.background.stroke.value);
    } else if (svgConfig.background.stroke.gradient) {
      setGradient(
        svgEl,
        svgConfig.background.stroke.gradient,
        `${myID}-bg-stroke-gradient`,
        viewBoxDimensions
      );
      bgRect.setAttribute("stroke", `url(#${myID}-bg-stroke-gradient)`);
    }

  } catch (err) {
    handleError(
      `setBackgroundRect: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
  }
};

export const setBaseIcon = (
  svgEl: SVGElement,
  myID: string,
  svgConfig: SvgConfig,
  viewBoxDimensions: ViewBoxDimensions
) => {
  try {
    if (!svgEl) {
      return handleError("setBaseIcon: No SVG element provided", undefined);
    }
    svgEl.setAttribute("width", svgConfig.size.toString());
    svgEl.setAttribute("height", svgConfig.size.toString());
    svgEl.setAttribute("stroke-width", svgConfig.icon.strokeWidth.toString());
    if (svgConfig.icon.fill.mode === "solid") {
      svgEl.setAttribute("fill", svgConfig.icon.fill.value);
    } else if (svgConfig.icon.fill.gradient) {
      setGradient(
        svgEl,
        svgConfig.icon.fill.gradient,
        `${myID}-icon-fill-gradient`,
        viewBoxDimensions
      );
      svgEl.setAttribute("fill", `url(#${myID}-icon-fill-gradient)`);
    }

    if (svgConfig.icon.stroke.mode === "solid") {
      svgEl.setAttribute("stroke", svgConfig.icon.stroke.value);
    } else if (svgConfig.icon.stroke.gradient) {
      setGradient(
        svgEl,
        svgConfig.icon.stroke.gradient,
        `${myID}-icon-stroke-gradient`,
        viewBoxDimensions
      );
      svgEl.setAttribute("stroke", `url(#${myID}-icon-stroke-gradient)`);
    }
  } catch (err) {
    handleError(
      `setBaseIcon: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
  }
};

export const getViewBoxDimensions = (svgEl: SVGElement): ViewBoxDimensions => {
  try {
    if (!svgEl) {
      return handleError("getViewBoxDimensions: No SVG element provided", { width: 24, height: 24 });
    }
    const viewBox = svgEl.getAttribute('viewBox');
    if (!viewBox) {
      return handleError("getViewBoxDimensions: No viewBox attribute found", { width: 24, height: 24 });
    }

    const viewBoxValues = viewBox.split(' ').map(Number);
    if (viewBoxValues.length < 4 || viewBoxValues.some(isNaN)) {
      return handleError("getViewBoxDimensions: Invalid viewBox format", { width: 24, height: 24 });
    }
    const width = viewBoxValues[2];
    const height = viewBoxValues[3];
    
    return {
      width,
      height
    };
  } catch (err) {
    return handleError(
      `getViewBoxDimensions: ${err instanceof Error ? err.message : String(err)}`,
      { width: 24, height: 24 }
    );
  }
}

export const addShapeSelection = (svgEl: SVGElement, setSelectedShapeId: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    if (!svgEl) {
      return handleError("addShapeSelection: No SVG element provided", undefined);
    }
    const shapeElements = svgEl.querySelectorAll('path, rect, circle, ellipse, polygon, polyline, line');
    shapeElements.forEach((shape, index) => {
      try {
        // Give each shape a unique ID if not already present
        if (!shape.id) shape.id = `shape-${index}`;
        const onClick = (e: MouseEvent) => {
          e.stopPropagation(); // prevent bubbling to SVG
          setSelectedShapeId(shape.id);
        };
        const onMouseEnter = () => {
          shape.classList.add('hover-outline');
          shape.addEventListener('click', onClick as EventListener);
        };
        const onMouseLeave = () => {
          shape.classList.remove('hover-outline');
          shape.removeEventListener('click', onClick as EventListener);
        };
        shape.addEventListener('mouseenter', onMouseEnter);
        shape.addEventListener('mouseleave', onMouseLeave);
      } catch (err) {
        handleError(
          `addShapeSelection: Failed to add listeners to shape ${index}: ${err instanceof Error ? err.message : String(err)}`,
          undefined
        );
      }
    });
  } catch (err) {
    handleError(
      `addShapeSelection: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
  }
}


export const setShapeStyles = (svgEl: SVGElement, shapeElement: Element, myID: string, shapeID: string, shapeConfig: ShapeConfig, viewBoxDimensions: ViewBoxDimensions) => {
  try {
    if (!shapeElement || !svgEl) {
      return handleError("setShapeStyles: Missing SVG element or shape element", undefined);
    }

    if (shapeConfig.strokeWidth !== undefined) {
      shapeElement.setAttribute("stroke-width", shapeConfig.strokeWidth.toString());
    }
    if (shapeConfig.fill !== undefined) {
      if (shapeConfig.fill.mode === "solid") {
        shapeElement.setAttribute("fill", shapeConfig.fill.value);
      } else if (shapeConfig.fill.gradient) {
        setGradient(
          svgEl,
          shapeConfig.fill.gradient,
          `${myID}-${shapeID}-fill-gradient`,
          viewBoxDimensions
        );
        shapeElement.setAttribute("fill", `url(#${myID}-${shapeID}-fill-gradient)`);
      }
    }
    if (shapeConfig.stroke !== undefined) {
      if (shapeConfig.stroke.mode === "solid") {
        shapeElement.setAttribute("stroke", shapeConfig.stroke.value);
      } else if (shapeConfig.stroke.gradient) {
        setGradient(
          svgEl,
          shapeConfig.stroke.gradient,
          `${myID}-${shapeID}-stroke-gradient`,
          viewBoxDimensions
        );
        shapeElement.setAttribute("stroke", `url(#${myID}-${shapeID}-stroke-gradient)`);
      }
    }
  } catch (err) {
    handleError(
      `setShapeStyles: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
  }
}

export const setAllShapeStyles = (svgEl: SVGElement, myID: string, svgConfig: SvgConfig, viewBoxDimensions: ViewBoxDimensions) => {
  try {
    if (!svgEl) {
      return handleError("setAllShapeStyles: No SVG element provided", undefined);
    }
    Object.entries(svgConfig.shapes).forEach(([shapeID, shapeConfig]) => {
      try {
        if (!shapeConfig || !shapeID) return;
        const shapeElement = svgEl.querySelector(`#${shapeID}`);
        if (!shapeElement) {
          handleError(`setAllShapeStyles: Shape element not found for ID ${shapeID}`, undefined);
          return;
        }
        setShapeStyles(svgEl, shapeElement, myID, shapeID, shapeConfig, viewBoxDimensions);
      } catch (err) {
        handleError(
          `setAllShapeStyles: Failed to set styles for shape ${shapeID}: ${err instanceof Error ? err.message : String(err)}`,
          undefined
        );
      }
    });
  } catch (err) {
    handleError(
      `setAllShapeStyles: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
  }
}

export const highlightShape = (shapeID: string) => {
  try {
    const canvasEl = document.getElementById(canvasID);
    if (!canvasEl) {
      return handleError("highlightShape: Canvas element not found", undefined);
    }
    const svgEl = canvasEl.querySelector(`svg`) as unknown as SVGElement;
    if (!svgEl) {
      return handleError("highlightShape: SVG element not found", undefined);
    }
    const shapeElement = svgEl.querySelector(`#${shapeID}`);
    if (!shapeElement) {
      return handleError(`highlightShape: Shape element not found for ID ${shapeID}`, undefined);
    }
    shapeElement.classList.add('hover-outline');
  } catch (err) {
    handleError(
      `highlightShape: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
  }
};

export const unhighlightShape = (shapeID: string) => {
  try {
    const canvasEl = document.getElementById(canvasID);
    if (!canvasEl) {
      return handleError("unhighlightShape: Canvas element not found", undefined);
    }
    const svgEl = canvasEl.querySelector(`svg`) as unknown as SVGElement;
    if (!svgEl) {
      return handleError("unhighlightShape: SVG element not found", undefined);
    }
    const shapeElement = svgEl.querySelector(`#${shapeID}`);
    if (!shapeElement) {
      return handleError(`unhighlightShape: Shape element not found for ID ${shapeID}`, undefined);
    }
    shapeElement.classList.remove('hover-outline');
  } catch (err) {
    handleError(
      `unhighlightShape: ${err instanceof Error ? err.message : String(err)}`,
      undefined
    );
  }
}