import { GeoJSON } from 'react-leaflet';

import type { Controls } from '@/_core/types';
import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { transformSFMTALines } from '@/_core/lib/transformData';
import { SFMTA_LINES_LAYER } from '@/_core/constants';

interface SFMTALinesLayerProps {
  data: any;
  controls: Controls;
}

export default function SFMTALinesLayer({ data, controls }: SFMTALinesLayerProps) {
  if (!data || !controls) return null;

  const transformedData = transformSFMTALines(data, controls);

  const key = `${controls.transportation.metro.visible}-${controls.transportation.buses.visible}-${controls.transportation.cableCar.visible}`;

  return (
    <GeoJSON
      key={key}
      data={transformedData}
      pane={SFMTA_LINES_LAYER}
      onEachFeature={onEachFeatureFactory(SFMTA_LINES_LAYER)}
      style={styleGeoJSONFactory(SFMTA_LINES_LAYER)}
    />
  );
}
