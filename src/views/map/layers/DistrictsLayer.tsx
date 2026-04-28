import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { DISTRICTS_LAYER } from '@/_core/constants';
import { useSidePanel } from '@/hooks/useSidePanel';

interface DistrictsLayerProps {
  data: any;
}

export default function DistrictsLayer({ data }: DistrictsLayerProps) {
  const { setOpen, setFeatureData } = useSidePanel();

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      pane={DISTRICTS_LAYER}
      onEachFeature={onEachFeatureFactory(DISTRICTS_LAYER, data => {
        setFeatureData(data);
        setOpen(true);
      })}
      style={styleGeoJSONFactory(DISTRICTS_LAYER)}
    />
  );
}
