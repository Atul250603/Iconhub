export interface IconElement {
  id: string;
  name: string;
  path: string;
  source: string;
}

export interface GradientConfig {
  type: 'linear' | 'radial',                
  colors: { value:string, left:number }[],
  angle: number,                   
}

export interface ColorData {
  mode: 'solid' | 'gradient',
  value: string,
  gradient?: GradientConfig | undefined
}

export interface ShadowConfig {
  enabled: boolean,
  color: string,
  offsetX: number,
  offsetY: number,
  blur: number,
}

export interface BackgroundConfig {
  fill: ColorData,
  stroke: ColorData,                  
  strokeWidth: number,                  
  rx: number
}

export interface IconConfig {
  fill: ColorData,
  stroke: ColorData,
  strokeWidth: number
}

export interface ShapeConfig {
  fill?: ColorData,
  stroke?: ColorData,
  strokeWidth?: number
}

export interface SvgConfig {
  size: number;
  background: BackgroundConfig;
  icon: IconConfig;
  shapes: Record<string, ShapeConfig>;
}

export interface ViewBoxDimensions {
  width: number;
  height: number;
}