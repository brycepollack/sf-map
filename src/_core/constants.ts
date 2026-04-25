import { LatLngBounds } from 'leaflet';
import type { Controls } from '@/_core/types';

export const DEFAULT_CONTROLS: Controls = {
  boundaries: {
    visible: true,
    neighborhoods: { visible: true },
    precincts: { visible: false },
    districts: { visible: false },
  },
  transportation: {
    visible: true,
    metro: { visible: true },
    bart: { visible: true },
    caltrain: { visible: true },
    buses: { visible: false },
    cableCar: { visible: false },
  },
  civics: {
    visible: true,
    parks: { visible: true },
    fireStations: { visible: false },
    policeStations: { visible: false },
  },
};

export const BART_LINES_LAYER = 'bart-lines';
export const BART_STATIONS_LAYER = 'bart-stations';
export const SFMTA_LINES_LAYER = 'sfmta-lines';
export const SFMTA_STATIONS_LAYER = 'sfmta-stations';
export const CALTRAIN_LINES_LAYER = 'caltrain-lines';
export const CALTRAIN_STATIONS_LAYER = 'caltrain-stations';
export const NEIGHBORHOODS_LAYER = 'neighborhoods';
export const PRECINCTS_LAYER = 'precincts';
export const DISTRICTS_LAYER = 'districts';
export const FIRE_STATIONS_LAYER = 'fire-stations';
export const POLICE_STATIONS_LAYER = 'police-stations';
export const PARKS_LAYER = 'parks';

const LAT_SHIFT = 0.01;
const LNG_SHIFT = 0.05;
export const SF_BOUNDS = new LatLngBounds(
  [37.639829 + LAT_SHIFT, -122.6787821436985 + LNG_SHIFT], // SW (south lat, west lng)
  [37.83659925233386 + LAT_SHIFT, -122.28178 + LNG_SHIFT], // NE (north lat, east lng)
);
export const SF_BBOX = [
  SF_BOUNDS.getWest(),
  SF_BOUNDS.getSouth(),
  SF_BOUNDS.getEast(),
  SF_BOUNDS.getNorth(),
].join(',');
