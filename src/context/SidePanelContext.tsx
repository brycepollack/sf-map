import { useEffect, useState } from 'react';

import { api } from '@/_api';
import type {
  NeighborhoodsRelationshipsMap,
  DistrictsRelationshipsMap,
  DistrictsData,
  SidePanelFeatureData,
  PrecinctsRelationshipsMap,
} from '@/_core/types';
import { SidePanelContext } from '@/hooks/useSidePanel';

export function SidePanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [featureData, setFeatureData] = useState<SidePanelFeatureData | null>(null);
  const [neighborhoodsRelationshipsMap, setNeighborhoodsRelationshipsMap] =
    useState<NeighborhoodsRelationshipsMap | null>(null);
  const [districtsRelationshipsMap, setDistrictsRelationshipsMap] =
    useState<DistrictsRelationshipsMap | null>(null);
  const [districtsData, setDistrictsData] = useState<DistrictsData | null>(null);
  const [precinctsRelationshipsMap, setPrecinctsRelationshipsMap] =
    useState<PrecinctsRelationshipsMap | null>(null);

  useEffect(() => {
    api.public.fetchNeighborhoodsRelationshipsMap().then(setNeighborhoodsRelationshipsMap);
    api.public.fetchDistrictsRelationshipsMap().then(setDistrictsRelationshipsMap);
    api.public.fetchDistrictsData().then(setDistrictsData);
    api.public.fetchPrecinctsRelationshipsMap().then(setPrecinctsRelationshipsMap);
  }, []);

  return (
    <SidePanelContext.Provider
      value={{
        open,
        setOpen,
        featureData,
        setFeatureData,
        neighborhoodsRelationshipsMap,
        districtsRelationshipsMap,
        districtsData,
        precinctsRelationshipsMap,
      }}
    >
      {children}
    </SidePanelContext.Provider>
  );
}
