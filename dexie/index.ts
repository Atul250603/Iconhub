import { Preset, PresetConfig } from '@/types';
import { iconHubDB as db } from './db';
import { presetVersion } from '@/constants';
import { handleError } from '@/utils/logs/error';

export async function addPreset(name: string,config: PresetConfig) : Promise<Preset | null> {
  try {
    const presetData : Preset = {
      id: crypto.randomUUID(),
      name,
      config,
      version: presetVersion,
      updatedAt: Date.now()
    }

    await db.presets.add(presetData);
    return presetData;
  } catch (error) {
    return handleError<Preset | null>(`addPreset: Failed to add preset ${error instanceof Error ? error.message : String(error)}`, null);
  }
}

export async function getPreset(id: string) : Promise<Preset | null> {
  try {
    const preset = await db.presets.get(id);
    if (!preset) {
      return null;
    }
    return preset;
  } catch (error) {
    return handleError<Preset | null>(`getPreset: Failed to get preset ${error instanceof Error ? error.message : String(error)}`, null);
  }
}

export async function getPresetByName(name: string) : Promise<Preset[]> {
  try {
    const presets = await db.presets.where('name').equalsIgnoreCase(name).toArray();
    return presets;
  } catch (error) {
    return handleError<Preset[]>(`getPresetByName: Failed to get preset by name ${error instanceof Error ? error.message : String(error)}`, []);
  }
}

export async function getAllPresets() : Promise<Preset[]> {
  try {
    const presets = await db.presets.toArray();
    return presets;
  } catch (error) {
    return handleError<Preset[]>(`getAllPresets: Failed to get all presets ${error instanceof Error ? error.message : String(error)}`, []);
  }
}

export async function updatePreset(id: string, config: PresetConfig) : Promise<Preset | null> {
  try {
    const preset = await db.presets.get(id);
    if (!preset) {
      throw new Error(`Preset not found`);
    }
    
    const updatedPreset : Preset = {
      ...preset,
      config,
      updatedAt: Date.now()
    }
    await db.presets.put(updatedPreset);
    return updatedPreset;
  } catch (error) {
    return handleError<Preset | null>(`updatePreset: Failed to update preset ${error instanceof Error ? error.message : String(error)}`, null);
  }
}

export async function deletePreset(id: string) : Promise<boolean> {
  try {
    await db.presets.delete(id);
    return true;
  } catch (error) {
    return handleError<boolean>(`deletePreset: Failed to delete preset ${error instanceof Error ? error.message : String(error)}`, false);
  }
}