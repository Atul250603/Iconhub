import { Separator } from "@/components/ui/separator";
import FieldLabel from "./FieldLabel";
import CustomColorPicker from "./ColorPicker";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { isEqual } from "lodash-es";
import { useColorPicker } from "react-best-gradient-color-picker";
import type { ShapeConfig, SvgConfig } from "@/types";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import HighlightSelectedElement from "./HighlightSelectedElement";
import ResetButton from "./ResetButton";
import { motion } from "motion/react";

export default function IconElementConfig({ svgConfig, setSvgConfig, selectedShapeId }: { svgConfig: SvgConfig, setSvgConfig: React.Dispatch<React.SetStateAction<SvgConfig>>, selectedShapeId: string }) {

  const [strokeColor, setStrokeColor] = useState<string>(svgConfig.shapes[selectedShapeId]?.stroke?.value ?? svgConfig.icon.stroke.value);
  const [fillColor, setFillColor] = useState<string>(svgConfig.shapes[selectedShapeId]?.fill?.value ?? svgConfig.icon.fill.value);
  const [strokeWidth, setStrokeWidth] = useState<number>(svgConfig.shapes[selectedShapeId]?.strokeWidth ?? svgConfig.icon.strokeWidth);

  // we need to only set the shape values in the svg config when the user sets them
  const hasUserInteracted = useRef(false);

  const { getGradientObject : getStrokeGradientObject } = useColorPicker(strokeColor, setStrokeColor);
  const { getGradientObject : getFillGradientObject } = useColorPicker(fillColor, setFillColor);
  const isStrokeGradient = useMemo(() => getStrokeGradientObject(strokeColor)?.isGradient, [getStrokeGradientObject, strokeColor]);
  const isFillGradient = useMemo(() => getFillGradientObject(fillColor)?.isGradient, [getFillGradientObject, fillColor]);
  const strokeGradient = useMemo(() => getStrokeGradientObject(strokeColor), [getStrokeGradientObject, strokeColor]);
  const fillGradient = useMemo(() => getFillGradientObject(fillColor), [getFillGradientObject, fillColor]);
  const fillGradObj = useMemo(() => {
    if (!isFillGradient) return undefined;
    return {
      type: (fillGradient?.gradientType === 'radial-gradient' ? 'radial' : 'linear') as 'radial' | 'linear',
      colors: fillGradient?.colors ?? [
        { value: fillColor ?? 'transparent', left: 0 },
        { value: fillColor ?? 'transparent', left: 100 }
      ],
      angle: Number(fillGradient?.degrees?.split('deg')?.[0] ?? 0),
    };
  }, [isFillGradient, fillGradient?.gradientType, fillGradient?.colors, fillGradient?.degrees]);
  
  const strokeGradObj = useMemo(() => {
    if (!isStrokeGradient) return undefined;
    return {
      type: (strokeGradient?.gradientType === 'radial-gradient' ? 'radial' : 'linear') as 'radial' | 'linear',
      colors: strokeGradient?.colors ?? [
        { value: strokeColor ?? 'transparent', left: 0 },
        { value: strokeColor ?? 'transparent', left: 100 }
      ],
      angle: Number(strokeGradient?.degrees?.split('deg')?.[0] ?? 0),
    };
  }, [isStrokeGradient, strokeGradient?.gradientType, strokeGradient?.colors, strokeGradient?.degrees]);



  const handleStrokeColorChange = (color: string) => {
    hasUserInteracted.current = true;
    setStrokeColor(color);
  };

  const handleFillColorChange = (color: string) => {
    hasUserInteracted.current = true;
    setFillColor(color);
  };

  const handleStrokeWidthChange = (width: number) => {
    hasUserInteracted.current = true;
    setStrokeWidth(width);
  };


  // when the svg config for the icon changes, reset the state values to the new values i.e. either the shape override values or the global icon config values and the hasUserInteracted flag to false
  useEffect(() => {
    hasUserInteracted.current = false;
    setStrokeColor(svgConfig.shapes[selectedShapeId]?.stroke?.value ?? svgConfig.icon.stroke.value);
    setFillColor(svgConfig.shapes[selectedShapeId]?.fill?.value ?? svgConfig.icon.fill.value);
    setStrokeWidth(svgConfig.shapes[selectedShapeId]?.strokeWidth ?? svgConfig.icon.strokeWidth);
  }, [svgConfig.icon, selectedShapeId]);

  // When the state values change, update the svgConfig only if the user has interacted with the component
  useEffect(() => {
    if (!hasUserInteracted.current) return;

    const newFill = {
      mode: isFillGradient ? 'gradient' : 'solid' as 'gradient' | 'solid',
      value: fillColor,
      gradient: fillGradObj,
    };
    
    const newStroke = {
      mode: isStrokeGradient ? 'gradient' : 'solid' as 'gradient' | 'solid',
      value: strokeColor,
      gradient: strokeGradObj,
    };


    setSvgConfig((prev: SvgConfig) => {
      const nextShape: ShapeConfig = { ...prev.shapes[selectedShapeId] };
      let nextSvgConfig: SvgConfig = { ...prev };
      // Only store properties that differ from global config
      if (!isEqual(newFill, prev.icon.fill)) {
          nextShape.fill = newFill;
        } else {
          delete nextShape.fill; // Remove if matches global
        }
    
        if (!isEqual(newStroke, prev.icon.stroke)) {
          nextShape.stroke = newStroke;
        } else {
          delete nextShape.stroke; // Remove if matches global
        }
    
        if (strokeWidth !== prev.icon.strokeWidth) {
          nextShape.strokeWidth = strokeWidth;
        } else {
          delete nextShape.strokeWidth; // Remove if matches global
        }
    
        // If object is empty, delete the entire override entry
        if (Object.keys(nextShape).length === 0) {
          const { [selectedShapeId]: removed, ...rest } = prev.shapes;
          nextSvgConfig = { ...nextSvgConfig, shapes: rest };
        } else {
          nextSvgConfig = { ...nextSvgConfig, shapes: { ...nextSvgConfig.shapes, [selectedShapeId]: nextShape } };
        }

        return isEqual(prev, nextSvgConfig) ? prev : nextSvgConfig;
      });
  }, [
    isFillGradient,
    fillColor,
    fillGradObj,
    isStrokeGradient,
    strokeColor,
    strokeGradObj,
    strokeWidth,
    selectedShapeId,
    svgConfig.icon,
    hasUserInteracted.current,
  ]);

  // Show the reset button if there is a shape override for the selectedShapeId
  const differsFromDefault = useMemo(() => {
    return !!svgConfig.shapes[selectedShapeId];
  }, [svgConfig.shapes, selectedShapeId]);

  const showResetButton = useDebouncedValue(differsFromDefault, 200);


  // Reset the state values and also delete the shape override from the svgConfig as we are now consuming the global icon config
  const handleReset = useCallback(() => {
    hasUserInteracted.current = false;
    setStrokeColor(svgConfig.icon.stroke.value);
    setFillColor(svgConfig.icon.fill.value);
    setStrokeWidth(svgConfig.icon.strokeWidth);

    setSvgConfig((prev: SvgConfig) => {
      const { [selectedShapeId]: removed, ...rest } = prev.shapes;
      const nextSvgConfig: SvgConfig = { ...prev, shapes: rest };
      return isEqual(prev, nextSvgConfig) ? prev : nextSvgConfig;
    });
  }, [svgConfig.icon, selectedShapeId, hasUserInteracted.current]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeInOut'}}
    >
        <div className="flex gap-2 items-center my-4">
            <div className="flex-1">
                <Separator />
            </div>
            <div className="w-max text-sm font-semibold">
                Selected Element's Customization
            </div>
            <div className="flex-1">
                <Separator />
            </div>
        </div>
        <div className="flex justify-end my-2">
          <ResetButton showResetButton={showResetButton} onClick={handleReset} />
        </div>
        <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-center">
              <HighlightSelectedElement selectedShapeId={selectedShapeId} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <FieldLabel label="Stroke Color" description="Outline color of the element. Supports solid colors and gradients." />
            <div>
                <CustomColorPicker color={strokeColor} setColor={handleStrokeColorChange} />          
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <FieldLabel label="Stroke Width" description="Thickness of the element outline. Set to 0 to hide the outline." />
            <div className="text-sm text-muted-foreground">
              {strokeWidth}
            </div>
          </div>
          <div className="mt-2">
            <Slider
              value={[strokeWidth]}
              min={0}
              max={2.5}
              step={0.1}
              onValueChange={(value) => {
                handleStrokeWidthChange(value[0]);
              }}
            />
          </div>
        </div>
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel label="Fill Color" description="Interior color of the element. Supports solid colors and gradients." />
          <div>
            <CustomColorPicker color={fillColor} setColor={handleFillColorChange} />          
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  )
}