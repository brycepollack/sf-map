import { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';

import type { Controls } from '@/_core/types';
import { SFMTA_STATIONS_LAYER } from '@/_core/constants';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { pointToLayerFactory } from '@/_core/lib/pointToLayerFactory';
import { transformSFMTAStations } from '@/_core/lib/transformData';

interface SFMTAStationsLayerProps {
  data: any;
  controls: Controls;
}

export default function SFMTAStationsLayer({ data, controls }: SFMTAStationsLayerProps) {
  const { metro, buses, cableCar } = controls.transportation;
  const transformedData = useMemo(
    () => (data ? transformSFMTAStations(data, controls) : null),
    [data, controls],
  );
  const key = `${metro.visible}-${buses.visible}-${cableCar.visible}`;

  if (!transformedData) return null;

  return (
    <GeoJSON
      key={key}
      data={transformedData}
      pane={SFMTA_STATIONS_LAYER}
      pointToLayer={pointToLayerFactory(SFMTA_STATIONS_LAYER)}
      onEachFeature={onEachFeatureFactory(SFMTA_STATIONS_LAYER)}
    />
  );
}
