"use client";
import { Button } from "@/components/ui/button";
import usePresets from "@/hooks/usePresets";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Edit } from "lucide-react";
import { useState } from "react";
import { SavePresetDialog } from "./SavePresetDialog";
import { useAtom } from "jotai";
  import { SvgConfig } from "@/types";

  export default function SavePresetBtn({ svgConfig }: { svgConfig: SvgConfig }) {
  const { selectedPreset, update } = usePresets();

  const [open, setOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleUpdatePreset = async () => {
    setUpdateLoading(true);
    await update(selectedPreset?.id || "", svgConfig);
    setUpdateLoading(false);
  }

  return (
    <>
      {!selectedPreset ? (
        <SavePresetDialog svgConfig={svgConfig} open={open} setOpen={setOpen} />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Save / Update Preset
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mr-2 w-max p-2 grid gap-2">
            <div>
              <SavePresetDialog svgConfig={svgConfig} open={open} setOpen={setOpen} />
            </div>
            <div>
              <Button variant="ghost" size="sm" className="w-full justify-start" disabled={updateLoading} onClick={handleUpdatePreset}>
                    <Edit className="size-4" />
                    <span>Update Selected Preset</span>
              </Button>
            </div>
            </PopoverContent>
        </Popover>
      )}
    </>
  );
}
