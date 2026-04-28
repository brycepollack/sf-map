import { GeoJSON } from 'react-leaflet';

import { POLICE_STATIONS_LAYER } from '@/_core/constants';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { pointToLayerFactory } from '@/_core/lib/pointToLayerFactory';
import { transformPoliceStations } from '@/_core/lib/transformData';

interface PoliceStationsLayerProps {
  data: any;
}

export default function PoliceStationsLayer({ data }: PoliceStationsLayerProps) {
  const transformedData = data ? transformPoliceStations(data) : null;

  if (!transformedData) return null;

  return (
    <GeoJSON
      data={transformedData}
      pane={POLICE_STATIONS_LAYER}
      pointToLayer={pointToLayerFactory(POLICE_STATIONS_LAYER)}
      onEachFeature={onEachFeatureFactory(POLICE_STATIONS_LAYER)}
    />
  );
}
