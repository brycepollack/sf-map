import { X } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useSidePanel } from '@/context/SidePanelContext';
import { NEIGHBORHOODS_LAYER, PRECINCTS_LAYER, DISTRICTS_LAYER } from '@/_core/constants';
import NeighborhoodsPanel from './panels/NeighborhoodsPanel';
import PrecinctsPanel from './panels/PrecinctsPanel';
import DistrictsPanel from './panels/DistrictsPanel';

function SidePanelContent() {
  const { featureData } = useSidePanel();
  switch (featureData?.layer) {
    case NEIGHBORHOODS_LAYER:
      return <NeighborhoodsPanel />;
    case PRECINCTS_LAYER:
      return <PrecinctsPanel />;
    case DISTRICTS_LAYER:
      return <DistrictsPanel />;
    default:
      return null;
  }
}

export default function SidePanel() {
  const { open, setOpen, featureData } = useSidePanel();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="z-9999" showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>{featureData?.title}</SheetTitle>
          <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <div className="overflow-y-auto flex-1">
          <SidePanelContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
