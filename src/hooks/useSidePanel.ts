import { createContext, useContext } from 'react';

import type {
  NeighborhoodsRelationshipsMap,
  DistrictsRelationshipsMap,
  DistrictsData,
  SidePanelFeatureData,
  PrecinctsRelationshipsMap,
} from '@/_core/types';

export interface SidePanelContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  featureData: SidePanelFeatureData | null;
  setFeatureData: (data: SidePanelFeatureData | null) => void;
  neighborhoodsRelationshipsMap: NeighborhoodsRelationshipsMap | null;
  districtsRelationshipsMap: DistrictsRelationshipsMap | null;
  districtsData: DistrictsData | null;
  precinctsRelationshipsMap: PrecinctsRelationshipsMap | null;
}

export const SidePanelContext = createContext<SidePanelContextValue | null>(null);

export function useSidePanel() {
  const ctx = useContext(SidePanelContext);
  if (!ctx) throw new Error('useSidePanel must be used within SidePanelProvider');
  return ctx;
}
