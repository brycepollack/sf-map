import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { transformBARTLines } from '@/_core/lib/transformData';
import { BART_LINES_LAYER } from '@/_core/constants';

interface BARTLinesLayerProps {
  data: any;
}

export default function BARTLinesLayer({ data }: BARTLinesLayerProps) {
  if (!data) return null;

  const transformedData = transformBARTLines(data);

  return (
    <GeoJSON
      data={transformedData}
      pane={BART_LINES_LAYER}
      style={styleGeoJSONFactory(BART_LINES_LAYER)}
      onEachFeature={onEachFeatureFactory(BART_LINES_LAYER)}
    />
  );
}
