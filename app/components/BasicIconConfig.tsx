import { Slider } from "@/components/ui/slider";
import { useCallback, useEffect, useMemo, useState } from "react";
import CustomColorPicker from "./ColorPicker";
import { useColorPicker } from "react-best-gradient-color-picker";
import type { SvgConfig } from "@/types";
import { isEqual } from "lodash-es";
import FieldLabel from "./FieldLabel";
import { defaultSvgConfig } from "@/constants";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import ResetButton from "./ResetButton";
import { motion } from "motion/react";

export default function BasicIconConfig({ svgConfig, setSvgConfig }: { svgConfig: SvgConfig, setSvgConfig: React.Dispatch<React.SetStateAction<SvgConfig>> }) {
  const [strokeWidth, setStrokeWidth] = useState<number>(svgConfig.icon.strokeWidth);
  const [strokeColor, setStrokeColor] = useState<string>(svgConfig.icon.stroke.value);
  const [fillColor, setFillColor] = useState<string>(svgConfig.icon.fill.value);
  const [size, setSize] = useState<number>(svgConfig.size);

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

  useEffect(() => {
    // compute next config based only on primitives + memoized objects
    setSvgConfig((prev: SvgConfig) => {
      const next: SvgConfig = {
        ...prev,
        size,
        icon: {
          ...prev.icon,
          fill: {
            mode: isFillGradient ? 'gradient' : 'solid',
            value: fillColor,
            gradient: fillGradObj,
          },
          stroke: {
            mode: isStrokeGradient ? 'gradient' : 'solid',
            value: strokeColor,
            gradient: strokeGradObj,
          },
          strokeWidth,
        }
      };
  
      return isEqual(prev, next) ? prev : next;
    });
  }, [
    isFillGradient,
    fillColor,
    fillGradObj,
    isStrokeGradient,
    strokeColor,
    strokeGradObj,
    strokeWidth,
    size,
  ]);

  const differsFromDefault = useMemo(() => {
    return !isEqual(svgConfig.icon, defaultSvgConfig.icon) || size !== defaultSvgConfig.size;
  }, [svgConfig.icon, size]);

  const showResetButton = useDebouncedValue(differsFromDefault, 200);

  const handleReset = useCallback(() => {
    setStrokeColor(defaultSvgConfig.icon.stroke.value);
    setFillColor(defaultSvgConfig.icon.fill.value);
    setStrokeWidth(defaultSvgConfig.icon.strokeWidth);
    setSize(defaultSvgConfig.size);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeInOut'}}
      className="flex flex-col gap-4"
    >
      <div className="flex justify-end my-2">
        <ResetButton showResetButton={showResetButton} onClick={handleReset} />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel label="Size" description="Overall size of the icon in pixels. Adjusts both width and height proportionally." />
          <div className="text-sm text-muted-foreground">
            {size}
          </div>
          </div>
          <div className="mt-2">
            <Slider
              value={[size]}
              min={20}
              max={600}
              step={1}
              onValueChange={(value) => {
                setSize(value[0]);
              }}
            />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel label="Stroke Color" description="Outline color of the icon. Supports solid colors and gradients." />
          <div>
            <CustomColorPicker color={strokeColor} setColor={setStrokeColor} />          
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel label="Stroke Width" description="Thickness of the icon outline. Set to 0 to hide the outline." />
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
              setStrokeWidth(value[0]);
            }}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel label="Fill Color" description="Interior color of the icon shapes. Supports solid colors and gradients." />
          <div>
            <CustomColorPicker color={fillColor} setColor={setFillColor} />          
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-bold">Note :</span> You can customize the individual elements of the icon by hovering over the icon and selecting the element you want to edit.
      </div>
    </motion.div>
  )
}