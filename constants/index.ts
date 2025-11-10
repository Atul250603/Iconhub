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
export const localStorageKeys = {
  submitted: "hasSubmittedFeedback",
  lastFeedbackDate: "lastFeedbackDate"
}

export const colorPresets = [
  'rgba(1,1,1, 0)',
  'rgba(128,128,128, 1)',
  'rgba(192,192,192, 1)',
  'rgba(255,255,255, 1)',
  'rgba(0,0,128,1)',
  'rgba(0,0,255,1)',
  'rgba(0,255,255, 1)',
  'rgba(0,128,0,1)',
  'rgba(128,128,0, 1)',
  'rgba(0,128,128,1)',
  'rgba(0,255,0, 1)',
  'rgba(128,0,0, 1)',
  'rgba(128,0,128, 1)',
  'rgba(175, 51, 242, 1)',
  'rgba(255,0,255, 1)',
  'rgba(255,0,0, 1)',
  'rgba(240, 103, 46, 1)',
  'rgba(255,255,0, 1)',
]
