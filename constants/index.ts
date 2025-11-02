import type { SvgConfig } from "@/types";

export const defaultSvgConfig: SvgConfig = {
  size: 200,
  background: {
    fill: {
      mode: "solid",
      value: "none",
      gradient: undefined,
    },
    stroke: {
      mode: "solid",
      value: "none",
      gradient: undefined,
    },
    strokeWidth: 0, // between 0 and 2.5
    rx: 0, // between 0 and 12 if the viewbox is 24 x 24 as the half of 24 is 12 i.e 50%

  },
  icon: {
    fill: {
      mode: "solid",
      value: "none",
      gradient: undefined,
    },
    stroke: {
      mode: "solid",
      value: "rgba(0, 0, 0, 1)",
      gradient: undefined,
    },
    strokeWidth: 2,
  },
  shapes: {},
};

export const myID = 'iconhub'
export const canvasID = `${myID}-canvas` as const