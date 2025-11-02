import { useEffect, useRef, useState } from "react";

export default function useActiveTab(selectedShapeId: string | null) {
  const [activeTab, setActiveTab] = useState<string>("icon");
  // to keep track of the previous selected shape id
  const previousSelectedShapeId = useRef<string | null>(null);

  // if the user clicks on a shape, we need to set the active tab to "icon"
  useEffect(() => {
    if (selectedShapeId !== previousSelectedShapeId.current) {
      setActiveTab("icon");
    }
    previousSelectedShapeId.current = selectedShapeId;
  }, [selectedShapeId]);

  return [activeTab, setActiveTab];
}