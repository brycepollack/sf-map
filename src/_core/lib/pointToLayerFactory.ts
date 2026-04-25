import L, { type DivIcon, type LatLng, type Marker } from 'leaflet';
import type { Feature, Geometry } from 'geojson';

import {
  BART_STATIONS_LAYER,
  CALTRAIN_STATIONS_LAYER,
  SFMTA_STATIONS_LAYER,
  FIRE_STATIONS_LAYER,
  POLICE_STATIONS_LAYER,
} from '@/_core/constants';
import {
  STATION_MARKER_SIZE,
  STATION_MARKER_COLOR_BG,
  STATION_MARKER_COLOR_BORDER,
  STATION_MARKER_BORDER_WIDTH,
  FIRE_STATION_MARKER_COLOR,
  POLICE_STATION_MARKER_COLOR,
  CIVIC_STATION_MARKER_SIZE,
} from '@/_core/tokens';

const TRANSIT_STATION_HTML = `<div style="width:${STATION_MARKER_SIZE}px;height:${STATION_MARKER_SIZE}px;border-radius:50%;background:${STATION_MARKER_COLOR_BG};border:${STATION_MARKER_BORDER_WIDTH} solid ${STATION_MARKER_COLOR_BORDER};box-sizing:border-box;"></div>`;
const FIRE_STATION_HTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${CIVIC_STATION_MARKER_SIZE}" height="${CIVIC_STATION_MARKER_SIZE}" viewBox="0 0 24 24" fill="none" stroke="${FIRE_STATION_MARKER_COLOR}"           
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">                                                                                     
    <path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"/>                                                                                           
    <path d="M9 18h8"/>                                                                                                                                
    <path d="M18 3h-3"/>
    <path d="M11 3a6 6 0 0 0-6 6v11"/>                                                                                                                 
    <path d="M5 13h4"/>
    <path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/>                                                                                 
  </svg>`;
const POLICE_STATION_HTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${CIVIC_STATION_MARKER_SIZE}" height="${CIVIC_STATION_MARKER_SIZE}" viewBox="0 0 24 24" fill="none" stroke="${POLICE_STATION_MARKER_COLOR}" 
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">                                                                                     
    <path d="M7 18v-6a5 5 0 1 1 10 0v6"/>
    <path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/>                                                                 
    <path d="M21 12h1"/>                                                                                                                               
    <path d="M18.5 4.5 18 5"/>                                                                                                                         
    <path d="M2 12h1"/>                                                                                                                                
    <path d="M12 2v1"/>                                                                                                                                
    <path d="m4.929 4.929.707.707"/>
    <path d="M12 12v6"/>                                                                                                                               
  </svg>`;

function makeIcon(html: string, size: number): DivIcon {
  return L.divIcon({
    className: '',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function transitStationPointToLayer(_: Feature<Geometry>, latlng: LatLng): Marker {
  return L.marker(latlng, { icon: makeIcon(TRANSIT_STATION_HTML, STATION_MARKER_SIZE) });
}

function fireStationPointToLayer(_: Feature<Geometry>, latlng: LatLng): Marker {
  return L.marker(latlng, { icon: makeIcon(FIRE_STATION_HTML, CIVIC_STATION_MARKER_SIZE) });
}

function policeStationPointToLayer(_: Feature<Geometry>, latlng: LatLng): Marker {
  return L.marker(latlng, { icon: makeIcon(POLICE_STATION_HTML, CIVIC_STATION_MARKER_SIZE) });
}

export function pointToLayerFactory(
  layerName: string,
): ((_: Feature<Geometry>, latlng: LatLng) => Marker) | undefined {
  switch (layerName) {
    case BART_STATIONS_LAYER:
    case CALTRAIN_STATIONS_LAYER:
    case SFMTA_STATIONS_LAYER:
      return transitStationPointToLayer;
    case FIRE_STATIONS_LAYER:
      return fireStationPointToLayer;
    case POLICE_STATIONS_LAYER:
      return policeStationPointToLayer;
    default:
      return undefined;
  }
}
