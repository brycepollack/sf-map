import { GeoJSON } from 'react-leaflet';

import { FIRE_STATIONS_LAYER } from '@/_core/constants';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { pointToLayerFactory } from '@/_core/lib/pointToLayerFactory';
import { transformFireStations } from '@/_core/lib/transformData';

interface FireStationsLayerProps {
  data: any;
}

export default function FireStationsLayer({ data }: FireStationsLayerProps) {
  const transformedData = data ? transformFireStations(data) : null;

  if (!transformedData) return null;

  return (
    <GeoJSON
      data={transformedData}
      pane={FIRE_STATIONS_LAYER}
      pointToLayer={pointToLayerFactory(FIRE_STATIONS_LAYER)}
      onEachFeature={onEachFeatureFactory(FIRE_STATIONS_LAYER)}
    />
  );
}
