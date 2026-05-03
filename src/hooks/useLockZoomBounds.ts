import { useEffect } from 'react';
import type { Map } from 'leaflet';

import { SF_BOUNDS } from '@/_core/constants';

export default function useLockZoomBounds(map: Map) {
  useEffect(() => {
    map.invalidateSize();
    map.fitBounds(SF_BOUNDS, { animate: false });
    const minZoom = map.getZoom();
    map.setMinZoom(minZoom);
  }, [map]);
}
