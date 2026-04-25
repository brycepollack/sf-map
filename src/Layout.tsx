import { useState } from 'react';

import { ControlPanelProvider } from '@/context/ControlPanelContext';
import { SidePanelProvider } from '@/context/SidePanelContext';
import Map from '@/views/map/Map';
import ControlPanel from '@/views/control-panel/ControlPanel';
import AddressSearch from '@/views/search-bar/AddressSearch';
import SidePanel from '@/views/side-panel/SidePanel';
import type { Marker } from '@/_core/types';


export default function Layout() {
  const [marker, setMarker] = useState<Marker | null>(null);

  return (
    <ControlPanelProvider>
      <SidePanelProvider>
        <div className="relative h-screen w-full">
          <Map marker={marker} />
          <ControlPanel />
          <AddressSearch onSelect={setMarker} />
          <SidePanel />
        </div>
      </SidePanelProvider>
    </ControlPanelProvider>
  );
}
