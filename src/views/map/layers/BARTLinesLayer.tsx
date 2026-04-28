import { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { transformBARTLines } from '@/_core/lib/transformData';
import { BART_LINES_LAYER } from '@/_core/constants';

interface BARTLinesLayerProps {
  data: any;
}

export default function BARTLinesLayer({ data }: BARTLinesLayerProps) {
  const transformedData = useMemo(() => data ? transformBARTLines(data) : null, [data]);

  if (!transformedData) return null;

  return (
    <GeoJSON
      data={transformedData}
      pane={BART_LINES_LAYER}
      style={styleGeoJSONFactory(BART_LINES_LAYER)}
      onEachFeature={onEachFeatureFactory(BART_LINES_LAYER)}
    />
  );
}
