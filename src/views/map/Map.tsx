import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, useMap } from 'react-leaflet';

import { SF_BOUNDS } from '@/_core/constants';
import { useControlPanel } from '@/hooks/useControlPanel';
import type { Marker } from '@/_core/types';
import NeighborhoodsLayer from '@/views/map/layers/NeighborhoodsLayer';
import PrecinctsLayer from '@/views/map/layers/PrecinctsLayer';
import DistrictsLayer from '@/views/map/layers/DistrictsLayer';
import SFMTALinesLayer from '@/views/map/layers/SFMTALinesLayer';
import SFMTAStationsLayer from '@/views/map/layers/SFMTAStationsLayer';
import BARTLinesLayer from '@/views/map/layers/BARTLinesLayer';
import BARTStationsLayer from '@/views/map/layers/BARTStationsLayer';
import CaltrainLinesLayer from '@/views/map/layers/CaltrainLinesLayer';
import CaltrainStationsLayer from '@/views/map/layers/CaltrainStationsLayer';
import FireStationsLayer from '@/views/map/layers/FireStationsLayer';
import PoliceStationsLayer from '@/views/map/layers/PoliceStationsLayer';
import ParksLayer from '@/views/map/layers/ParksLayer';
import useKeyboard from '@/hooks/useKeyboard';
import useMapData from '@/hooks/useMapData';
import useMapPanes from '@/hooks/useMapPanes';
import useLockZoomBounds from '@/hooks/useLockZoomBounds';

// NEW FEATURE CHECKLIST
// 1. _core/types.ts: add properties type + update Controls type
// 2. _core/constants.ts: add layer name constant + update DEFAULT_CONTROLS
// 3. _core/tokens.ts: add colors, z-index pane
// 4. _api/public/index.ts: add fetch function
// 5. hooks/useMapData.ts: add state + fetch call
// 6. hooks/useMapPanes.ts: register pane
// 7. _core/utils/styleGeoJSONFactory.ts: add case if needed
// 8. _core/utils/onEachFeatureFactory.ts: add case if needed
// 9. views/map/layers/NewLayer.tsx: create layer component
// 10. views/map/Map.tsx: add conditional render
// 11. views/control-panel/ControlForm.tsx: add checkbox UI

interface MapProps {
  marker: Marker | null;
}

function LockBoundsZoom() {
  const map = useMap();
  useLockZoomBounds(map);
  return null;
}

function MapPanes() {
  const map = useMap();
  useMapPanes(map);
  return null;
}

function KeyboardControls() {
  const map = useMap();
  useKeyboard(map);
  return null;
}

export default function Map({ marker }: MapProps) {
  const { controls } = useControlPanel();
  const {
    neighborhoods,
    precincts,
    districts,
    sfmtaTransit,
    bartTransit,
    caltrainTransit,
    firePoliceStations,
    parks,
  } = useMapData();

  return (
    <MapContainer
      bounds={SF_BOUNDS}
      maxBounds={SF_BOUNDS}
      maxBoundsViscosity={1}
      maxZoom={18}
      scrollWheelZoom
      className="absolute inset-0"
    >
      <LockBoundsZoom />
      <MapPanes />
      <KeyboardControls />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" />
      {marker && (
        <LeafletMarker position={[marker.lat, marker.lng]}>
          <Popup>{marker.label}</Popup>
        </LeafletMarker>
      )}
      {controls.boundaries.visible && controls.boundaries.neighborhoods.visible && (
        <NeighborhoodsLayer data={neighborhoods} />
      )}
      {controls.boundaries.visible && controls.boundaries.precincts.visible && (
        <PrecinctsLayer data={precincts} />
      )}
      {controls.boundaries.visible && controls.boundaries.districts.visible && (
        <DistrictsLayer data={districts} />
      )}
      {controls.transportation.visible && controls.transportation.bart.visible && (
        <BARTLinesLayer data={bartTransit} />
      )}
      {controls.transportation.visible && controls.transportation.bart.visible && (
        <BARTStationsLayer data={bartTransit} />
      )}
      {controls.transportation.visible && controls.transportation.caltrain.visible && (
        <CaltrainLinesLayer data={caltrainTransit} />
      )}
      {controls.transportation.visible && controls.transportation.caltrain.visible && (
        <CaltrainStationsLayer data={caltrainTransit} />
      )}
      {controls.transportation.visible && (
        <SFMTALinesLayer data={sfmtaTransit} controls={controls} />
      )}
      {controls.transportation.visible && (
        <SFMTAStationsLayer data={sfmtaTransit} controls={controls} />
      )}
      {controls.civics.visible && controls.civics.parks.visible && <ParksLayer data={parks} />}
      {controls.civics.visible && controls.civics.fireStations.visible && (
        <FireStationsLayer data={firePoliceStations} />
      )}
      {controls.civics.visible && controls.civics.policeStations.visible && (
        <PoliceStationsLayer data={firePoliceStations} />
      )}
    </MapContainer>
  );
}
