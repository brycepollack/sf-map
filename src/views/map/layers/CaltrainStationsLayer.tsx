import { GeoJSON } from 'react-leaflet';

import { CALTRAIN_STATIONS_LAYER } from '@/_core/constants';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { pointToLayerFactory } from '@/_core/lib/pointToLayerFactory';
import { transformStations } from '@/_core/lib/transformData';

interface CaltrainStationsLayerProps {
  data: any;
}

export default function CaltrainStationsLayer({ data }: CaltrainStationsLayerProps) {
  const transformedData = data ? transformStations(data) : null;

  if (!transformedData) return null;

  return (
    <GeoJSON
      data={transformedData}
      pane={CALTRAIN_STATIONS_LAYER}
      pointToLayer={pointToLayerFactory(CALTRAIN_STATIONS_LAYER)}
      onEachFeature={onEachFeatureFactory(CALTRAIN_STATIONS_LAYER)}
    />
  );
}
