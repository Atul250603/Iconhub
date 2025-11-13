import { getAllPresets, addPreset, updatePreset, deletePreset, getPreset } from "@/dexie";
import { presetsAtom, selectedPresetAtom } from "@/store/preset";
import { Preset, PresetConfig, SvgConfig } from "@/types";
import { handleError } from "@/utils/logs/error";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "toastrr";

export default function usePresets() {
  const [presets, setPresets] = useAtom(presetsAtom);
  const [selectedPreset, setSelectedPreset] = useAtom(selectedPresetAtom);
  const [loading, setLoading] = useState(false);

  const fetchPresets = async () : Promise<void> => {
    try {
      setLoading(true);
      const presets = await getAllPresets();
      setPresets(presets);
    } catch (error) {
      return handleError<void>(`usePresets: Failed to fetch presets ${error instanceof Error ? error.message : String(error)}`, undefined);
    } finally {
      setLoading(false);
    }
  }

  const add = async (name: string, config: SvgConfig) : Promise<void> => {
    try {
      const presetConfig: PresetConfig = {
        background: config.background,
        icon: config.icon,
        size: config.size
      }
      const preset = await addPreset(name, presetConfig);
      if (preset) {
        setPresets((prev) => [...prev, preset]);
        toast.success(`Preset saved successfully`);
      } else {
        toast.error(`Failed to save preset`);
      }

      return;
    } catch (error) {
      toast.error(`Failed to save preset`);
      return handleError<void>(`usePresets: Failed to add preset ${error instanceof Error ? error.message : String(error)}`, undefined);
    }
  }

  const update = async (id: string, config: SvgConfig) : Promise<void> => {
    try {
      const presetConfig: PresetConfig = {
        background: config.background,
        icon: config.icon,
        size: config.size
      }
      const preset = await updatePreset(id, presetConfig);
      if (preset) {
        setPresets((prev) => prev.map((p) => p.id === id ? preset : p));
        const newSelectedPreset = selectedPreset?.id === id ? preset : selectedPreset;
        setSelectedPreset(newSelectedPreset);
        toast.success(`Preset updated successfully`);
      } else {
        toast.error(`Failed to update preset`);
      }

      return;
    } catch (error) {
      toast.error(`Failed to update preset`);
      return handleError<void>(`usePresets: Failed to update preset ${error instanceof Error ? error.message : String(error)}`, undefined);
    }
  }

  const remove = async (id: string) : Promise<void> => {
    try {
      const success = await deletePreset(id);
      if (success) {
        setPresets((prev) => prev.filter((p) => p.id !== id));
        const newSelectedPreset = selectedPreset?.id === id ? null : selectedPreset;
        setSelectedPreset(newSelectedPreset);
        toast.success(`Preset deleted successfully`);
      } else {
        toast.error(`Failed to delete preset`);
      }
      return;
    } catch (error) {
      toast.error(`Failed to delete preset`);
      return handleError<void>(`usePresets: Failed to remove preset ${error instanceof Error ? error.message : String(error)}`, undefined);
    }
  }

  const select = (id: string) : void => {
    try {
      const preset = presets.find((p) => p.id === id);
      if (preset) {
        setSelectedPreset(preset);
      }
      return;
    }
    catch (error) {
      return handleError<void>(`usePresets: Failed to select preset ${error instanceof Error ? error.message : String(error)}`, undefined);
    }
  }

  // fetch presets on mount
  useEffect(() => {
    fetchPresets();
  }, [])

  return {
    presets,
    selectedPreset,
    add,
    update,
    remove,
    select,
    fetchPresets,
    loading
  }
}