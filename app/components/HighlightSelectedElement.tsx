import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { highlightShape, unhighlightShape } from "@/utils/svg";

export default function HighlightSelectedElement({ selectedShapeId }: { selectedShapeId: string }) {
  return (
    <div>
      <KbdGroup className="cursor-pointer" onMouseEnter={() => highlightShape(selectedShapeId)} onMouseLeave={() => unhighlightShape(selectedShapeId)}>
        <Kbd>{'# ' + selectedShapeId}</Kbd>
      </KbdGroup>
    </div>
  )
}