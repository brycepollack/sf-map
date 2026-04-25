import { GeoJSON } from 'react-leaflet';

import { FIRE_STATIONS_LAYER } from '@/_core/constants';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { pointToLayerFactory } from '@/_core/lib/pointToLayerFactory';

interface FireStationsLayerProps {
  data: any;
}

export default function FireStationsLayer({ data }: FireStationsLayerProps) {
  if (!data) return null;

  const transformedData = {
    ...data,
    features: data.features.filter((f: any) => f.properties?.jurisdiction === 'Fire Department'),
  };

  return (
    <GeoJSON
      data={transformedData}
      pane={FIRE_STATIONS_LAYER}
      pointToLayer={pointToLayerFactory(FIRE_STATIONS_LAYER)}
      onEachFeature={onEachFeatureFactory(FIRE_STATIONS_LAYER)}
    />
  );
}
