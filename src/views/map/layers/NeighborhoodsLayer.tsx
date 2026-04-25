import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { NEIGHBORHOODS_LAYER } from '@/_core/constants';
import { useSidePanel } from '@/context/SidePanelContext';

interface NeighborhoodsLayerProps {
  data: any;
}

export default function NeighborhoodsLayer({ data }: NeighborhoodsLayerProps) {
  if (!data) return null;

  const { setOpen, setFeatureData } = useSidePanel();

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
