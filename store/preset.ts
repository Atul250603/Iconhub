import { Preset } from "@/types";
import { atom } from "jotai";

export const presetsAtom = atom<Preset[]>([]);
export const selectedPresetAtom = atom<Preset | null>(null);
