import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { PRECINCTS_LAYER } from '@/_core/constants';
import { useSidePanel } from '@/hooks/useSidePanel';

interface PrecinctsLayerProps {
  data: any;
}

export default function PrecinctsLayer({ data }: PrecinctsLayerProps) {
  const { setOpen, setFeatureData } = useSidePanel();

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      pane={PRECINCTS_LAYER}
      onEachFeature={onEachFeatureFactory(PRECINCTS_LAYER, data => {
        setFeatureData(data);
        setOpen(true);
      })}
      style={styleGeoJSONFactory(PRECINCTS_LAYER)}
    />
  );
}
