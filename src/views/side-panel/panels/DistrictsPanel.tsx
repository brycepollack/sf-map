import CollapsibleChipList from '@/components/reusable/CollapsibleChipList';
import { useSidePanel } from '@/hooks/useSidePanel';

export default function DistrictsPanel() {
  const { featureData, districtsRelationshipsMap, districtsData } = useSidePanel();
  const districtId = featureData?.properties?.sup_dist as string | undefined;
  const related = districtId ? districtsRelationshipsMap?.[districtId] : undefined;
  const supervisor = districtId ? districtsData?.[districtId]?.supervisor : undefined;

  const neighborhoods = related?.neighborhoods ?? [];
  const precincts = related?.precincts ?? [];

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-1">Supervisor</h3>
        <p className="text-sm">
          {supervisor ?? <span className="text-muted-foreground">Unknown</span>}
        </p>
      </div>

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
