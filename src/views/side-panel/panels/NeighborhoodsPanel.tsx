import CollapsibleChipList from '@/components/reusable/CollapsibleChipList';
import { useSidePanel } from '@/context/SidePanelContext';

export default function NeighborhoodsPanel() {
  const { featureData, neighborhoodsRelationshipsMap } = useSidePanel();
  const neighborhoodId = featureData?.properties?.name as string | undefined;
  const related = neighborhoodId ? neighborhoodsRelationshipsMap?.[neighborhoodId] : undefined;

  const districts = related?.districts ?? [];
  const precincts = related?.precincts ?? [];

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-muted-foreground">Districts</h3>
          {districts.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 leading-none">
              {districts.length}
            </span>
          )}
        </div>
        <CollapsibleChipList items={districts} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-muted-foreground">Precincts</h3>
          {precincts.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 leading-none">
              {precincts.length}
            </span>
          )}
        </div>
        <CollapsibleChipList items={precincts} />
      </div>
    </div>
  );
}
