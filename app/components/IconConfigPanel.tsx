import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import BackgroundConfig from "./BackgroundConfig";
import type { SvgConfig, ViewBoxDimensions } from "@/types";
import BasicIconConfig from "./BasicIconConfig";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useActiveTab from "@/hooks/useActiveTab";
import IconElementConfig from "./IconElementConfig";
import { isEqual } from "lodash-es";
import { defaultSvgConfig } from "@/constants";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import ResetButton from "./ResetButton";

export default function IconConfig({ svgConfig, setSvgConfig, viewBoxDimensions, selectedShapeId }: { svgConfig: SvgConfig, setSvgConfig: React.Dispatch<React.SetStateAction<SvgConfig>>, viewBoxDimensions: ViewBoxDimensions, selectedShapeId: string | null }) {
  const [activeTab, setActiveTab] = useActiveTab(selectedShapeId) as [string, React.Dispatch<React.SetStateAction<string>>];

  return (
    <div className="h-full border">
      <div className="border-b p-4">
        <div className="flex items-center justify-between gap-2 text-lg font-bold">
          <span>Customize Icon</span>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          Customize your background and icon settings
        </div>
      </div>

      <div className="p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList
            className="w-full"
          >
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="icon">Icon</TabsTrigger>
          </TabsList>
          <TabsContent value="background" className="mt-2">
            <BackgroundConfig svgConfig={svgConfig} setSvgConfig={setSvgConfig} viewBoxDimensions={viewBoxDimensions} />
          </TabsContent>
          <TabsContent value="icon" className="mt-2">
            <BasicIconConfig svgConfig={svgConfig} setSvgConfig={setSvgConfig} />
            { selectedShapeId && <IconElementConfig key={selectedShapeId} svgConfig={svgConfig} setSvgConfig={setSvgConfig} selectedShapeId={selectedShapeId} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}