import CollapsibleChipList from '@/components/reusable/CollapsibleChipList';
import { useSidePanel } from '@/context/SidePanelContext';

export default function PrecinctsPanel() {
  const { featureData, precinctsRelationshipsMap } = useSidePanel();
  const precinctId = featureData?.properties?.prec_2022 as string | undefined;
  const related = precinctId ? precinctsRelationshipsMap?.[precinctId] : undefined;

  const neighborhoods = related?.neighborhoods ?? [];

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-muted-foreground">Neighborhoods</h3>
          {neighborhoods.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 leading-none">
              {neighborhoods.length}
            </span>
          )}
        </div>
        <CollapsibleChipList items={neighborhoods} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-1">District</h3>
        {related?.district ? (
          <p className="text-sm">District {related.district}</p>
        ) : (
          <p className="text-sm text-muted-foreground">None</p>
        )}
      </div>
    </div>
  );
}
