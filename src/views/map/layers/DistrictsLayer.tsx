import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { DISTRICTS_LAYER } from '@/_core/constants';
import { useSidePanel } from '@/context/SidePanelContext';

interface DistrictsLayerProps {
  data: any;
}

export default function DistrictsLayer({ data }: DistrictsLayerProps) {
  if (!data) return null;

  const { setOpen, setFeatureData } = useSidePanel();

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
