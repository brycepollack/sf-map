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
  if (!data || !controls) return null;

  const transformedData = transformSFMTAStations(data, controls);

  const key = `${controls.transportation.metro.visible}-${controls.transportation.buses.visible}-${controls.transportation.cableCar.visible}`;

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
