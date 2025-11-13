"use client";
import usePresets from "@/hooks/usePresets";
import SavePresetBtn from "./SavePresetBtn";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Trash2 } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { selectedPresetAtom } from "@/store/preset";
import { SvgConfig } from "@/types";

export default function Preset({ svgConfig, setSvgConfig }: { svgConfig: SvgConfig, setSvgConfig: React.Dispatch<React.SetStateAction<SvgConfig>> }) {
  const { presets, select, selectedPreset, remove } = usePresets();
  const [removeLoading, setRemoveLoading] = useState(false);
  const setSelectedPreset = useSetAtom(selectedPresetAtom)

  const handleRemovePreset = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setRemoveLoading(true);
    await remove(id);
    setRemoveLoading(false);
  }

  const handleSelectPreset = (id: string) => {
    if (selectedPreset?.id === id) {
        setSelectedPreset(null);
        return;
    } else {
       select(id)
    }
  }

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="max-w-1/2 flex-1">
        {
          presets?.length 
            ?
          <Combobox
            trigger={<Button variant="outline" size="sm" className="w-full justify-between">
              <span className="truncate">
                {
                  selectedPreset?.name || "Select Preset"
                }
              </span>
              <ChevronsUpDown className="size-4" />
            </Button>
            }
            emptyMessage="No presets found"
            commandInputPlaceholder="Search presets..."
          >
            {presets?.map((preset) => (
              <CommandItem key={preset.id} value={preset.name} className="cursor-pointer" onSelect={() => {
                handleSelectPreset(preset.id)
              }}>
                <div className="flex items-center justify-between w-full">
                  <div className="truncate">{preset.name}</div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div>{selectedPreset?.id === preset.id && <Check className="size-4" />}</div>
                    <div>
                      <Button variant="ghost" size="icon" disabled={removeLoading} onClick={(e) => handleRemovePreset(e, preset.id)}>
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </Combobox>
          :
          <></>
        }
      </div>
      <div className="flex-shrink-0">
        <SavePresetBtn svgConfig={svgConfig}/>
      </div>
    </div>
  )
}