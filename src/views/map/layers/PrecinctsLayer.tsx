import { GeoJSON } from 'react-leaflet';

import { styleGeoJSONFactory } from '@/_core/lib/styleGeoJSONFactory';
import { onEachFeatureFactory } from '@/_core/lib/onEachFeatureFactory';
import { PRECINCTS_LAYER } from '@/_core/constants';
import { useSidePanel } from '@/context/SidePanelContext';

interface PrecinctsLayerProps {
  data: any;
}

export default function PrecinctsLayer({ data }: PrecinctsLayerProps) {
  if (!data) return null;

  const { setOpen, setFeatureData } = useSidePanel();

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
