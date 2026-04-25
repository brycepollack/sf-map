import { GeoJSON } from 'react-leaflet';

import { POLICE_STATIONS_LAYER } from '@/_core/constants';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { pointToLayerFactory } from '@/_core/lib/pointToLayerFactory';

interface PoliceStationsLayerProps {
  data: any;
}

export default function PoliceStationsLayer({ data }: PoliceStationsLayerProps) {
  if (!data) return null;

  const transformedData = {
    ...data,
    features: data.features.filter((f: any) => f.properties?.jurisdiction === 'Police Department'),
  };

  return (
    <GeoJSON
      data={transformedData}
      pane={POLICE_STATIONS_LAYER}
      pointToLayer={pointToLayerFactory(POLICE_STATIONS_LAYER)}
      onEachFeature={onEachFeatureFactory(POLICE_STATIONS_LAYER)}
    />
  );
}
