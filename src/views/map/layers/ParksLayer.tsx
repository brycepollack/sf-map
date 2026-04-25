import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { PARKS_LAYER } from '@/_core/constants';

interface ParksLayerProps {
  data: any;
}

export default function ParksLayer({ data }: ParksLayerProps) {
  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      pane={PARKS_LAYER}
      onEachFeature={onEachFeatureFactory(PARKS_LAYER)}
      style={styleGeoJSONFactory(PARKS_LAYER)}
    />
  );
}
