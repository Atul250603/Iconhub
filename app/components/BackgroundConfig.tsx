import { Slider } from "@/components/ui/slider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CustomColorPicker from "./ColorPicker";
import { useColorPicker } from "react-best-gradient-color-picker";
import type { SvgConfig, ViewBoxDimensions } from "@/types";
import { isEqual } from "lodash-es";
import FieldLabel from "./FieldLabel";
import { defaultSvgConfig } from "@/constants";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import ResetButton from "./ResetButton";
import { motion } from "motion/react";
import usePresets from "@/hooks/usePresets";

export default function BackgroundConfig({ svgConfig, setSvgConfig, viewBoxDimensions }: { svgConfig: SvgConfig, setSvgConfig: React.Dispatch<React.SetStateAction<SvgConfig>>, viewBoxDimensions: ViewBoxDimensions }) {
  const { selectedPreset } = usePresets();

  const [strokeWidth, setStrokeWidth] = useState<number>(svgConfig.background.strokeWidth);
  const [strokeColor, setStrokeColor] = useState<string>(svgConfig.background.stroke.value);
  const [fillColor, setFillColor] = useState<string>(svgConfig.background.fill.value);
  const [borderRadius, setBorderRadius] = useState<number>(svgConfig.background.rx);
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
        background: {
          ...prev.background,
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
          rx: borderRadius,
        },
      };
  
      return isEqual(prev.background, next.background) ? prev : next;
    });
  }, [
    isFillGradient,
    fillColor,
    fillGradObj,
    isStrokeGradient,
    strokeColor,
    strokeGradObj,
    strokeWidth,
    borderRadius,
  ]);

  const differsFromDefault = useMemo(() => {
    return !isEqual(svgConfig.background, defaultSvgConfig.background);
  }, [svgConfig.background]);

  const showResetButton = useDebouncedValue(differsFromDefault, 200);

  const handleReset = useCallback(() => {
    setStrokeColor(defaultSvgConfig.background.stroke.value);
    setFillColor(defaultSvgConfig.background.fill.value);
    setStrokeWidth(defaultSvgConfig.background.strokeWidth);
    setBorderRadius(defaultSvgConfig.background.rx);
  }, []);


// sync the svg config with the preset when the selected preset changes
// changing the state values will trigger a re-render and the useEffect will be called again and it will update the svg config with the new values
  useEffect(() => {
    if (!selectedPreset) return;

    setStrokeColor(selectedPreset.config.background.stroke.value);
    setFillColor(selectedPreset.config.background.fill.value);
    setStrokeWidth(selectedPreset.config.background.strokeWidth);
    setBorderRadius(selectedPreset.config.background.rx);

  }, [selectedPreset?.id]);

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
          <FieldLabel label="Stroke Color" description="Border color around the background. Supports solid colors and gradients." />
          <div>
            <CustomColorPicker color={strokeColor} setColor={setStrokeColor} />          
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel label="Stroke Width" description="Thickness of the background border. Set to 0 to hide the border." />
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
          <FieldLabel label="Border Radius" description="Roundness of the background corners. Higher values create more rounded edges." />
          <div className="text-sm text-muted-foreground">
            {borderRadius}
          </div>
        </div>
        <div className="mt-2">
          <Slider
            value={[borderRadius]}
            min={0}
            max={Math.max(viewBoxDimensions.width / 2, viewBoxDimensions.height / 2)}
            step={1}
            onValueChange={(value) => {
              setBorderRadius(value[0]);
            }}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel label="Fill Color" description="Background color inside the shape. Supports solid colors and gradients." />
          <div>
            <CustomColorPicker color={fillColor} setColor={setFillColor} />          
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground border p-2 rounded-md">
        <span className="font-bold">Note :</span> These settings will be applied to the background of the icon not the shapes inside it.
      </div>
    </motion.div>
  )
}