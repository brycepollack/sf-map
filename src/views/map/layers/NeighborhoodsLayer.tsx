import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { NEIGHBORHOODS_LAYER } from '@/_core/constants';
import { useSidePanel } from '@/hooks/useSidePanel';

interface NeighborhoodsLayerProps {
  data: any;
}

export default function NeighborhoodsLayer({ data }: NeighborhoodsLayerProps) {
  const { setOpen, setFeatureData } = useSidePanel();

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      pane={NEIGHBORHOODS_LAYER}
      onEachFeature={onEachFeatureFactory(NEIGHBORHOODS_LAYER, data => {
        setFeatureData(data);
        setOpen(true);
      })}
      style={styleGeoJSONFactory(NEIGHBORHOODS_LAYER)}
    />
  );
}
