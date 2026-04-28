import { GeoJSON } from 'react-leaflet';

import { BART_STATIONS_LAYER } from '@/_core/constants';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { pointToLayerFactory } from '@/_core/lib/pointToLayerFactory';
import { transformStations } from '@/_core/lib/transformData';

interface BARTStationsLayerProps {
  data: any;
}

export default function BARTStationsLayer({ data }: BARTStationsLayerProps) {
  const transformedData = data ? transformStations(data) : null;

  if (!transformedData) return null;

  return (
    <GeoJSON
      data={transformedData}
      pane={BART_STATIONS_LAYER}
      pointToLayer={pointToLayerFactory(BART_STATIONS_LAYER)}
      onEachFeature={onEachFeatureFactory(BART_STATIONS_LAYER)}
    />
  );
}
