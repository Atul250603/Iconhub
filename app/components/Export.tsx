import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { trackIconExported } from "@/utils/analytics";
import { copySVGToClipboard, downloadAsPNG, downloadSVG } from "@/utils/svg/download";
import { ChevronDown } from "lucide-react";
import { toast } from "toastrr";

export default function Export({ fileName = "icon", className }: { fileName?: string, className?: string }) {
  const handleCopySVG = async () => {
    const success = await copySVGToClipboard();
    if (success) {
      toast.success('SVG copied to clipboard');
      trackIconExported(fileName,"copied_svg")
    } else {
      toast.error('Failed to copy SVG to clipboard');
    }
  }

  const handleDownloadSVG = () => {
    const success = downloadSVG(fileName + ".svg");
    if (success) {
      toast.success('SVG downloaded');
      trackIconExported(fileName,"downloaded_svg")
    } else {
      toast.error('Failed to download SVG');
    }
  }

  const handleDownloadPNG = async () => {
    const success = await downloadAsPNG(fileName + ".png");
    if (success) {
      toast.success('PNG downloaded');
      trackIconExported(fileName,"downloaded_png")
    } else {
      toast.error('Failed to download PNG');
    }
  }

  return (
    <div>
      <ButtonGroup>
        <Button variant="outline" onClick={handleCopySVG} className={className}>
            Copy SVG
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="More Options" className={className}>
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleCopySVG}>
                    Copy SVG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadSVG}>
                    Download SVG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadPNG}>
                    Download PNG
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  )
}