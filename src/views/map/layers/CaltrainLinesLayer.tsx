import { GeoJSON } from 'react-leaflet';

import { CALTRAIN_LINES_LAYER } from '@/_core/constants';
import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { transformCaltrainLines } from '@/_core/lib/transformData';

interface CaltrainLinesLayerProps {
  data: any;
}

export default function CaltrainLinesLayer({ data }: CaltrainLinesLayerProps) {
  if (!data) return null;

  const transformedData = transformCaltrainLines(data);

  return (
    <GeoJSON
      data={transformedData}
      pane={CALTRAIN_LINES_LAYER}
      style={styleGeoJSONFactory(CALTRAIN_LINES_LAYER)}
      onEachFeature={onEachFeatureFactory(CALTRAIN_LINES_LAYER)}
    />
  );
}
