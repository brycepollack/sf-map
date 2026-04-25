import { useEffect } from 'react';
import type { Map } from 'leaflet';

import {
  BART_LINES_LAYER,
  BART_STATIONS_LAYER,
  CALTRAIN_LINES_LAYER,
  CALTRAIN_STATIONS_LAYER,
  SFMTA_LINES_LAYER,
  SFMTA_STATIONS_LAYER,
  NEIGHBORHOODS_LAYER,
  PRECINCTS_LAYER,
  DISTRICTS_LAYER,
  FIRE_STATIONS_LAYER,
  POLICE_STATIONS_LAYER,
  PARKS_LAYER,
} from '@/_core/constants';
import {
  PANE_Z_PARKS,
  PANE_Z_NEIGHBORHOODS,
  PANE_Z_PRECINCTS,
  PANE_Z_DISTRICTS,
  PANE_Z_BART_LINES,
  PANE_Z_SFMTA_LINES,
  PANE_Z_BART_STATIONS,
  PANE_Z_CALTRAIN_LINES,
  PANE_Z_CALTRAIN_STATIONS,
  PANE_Z_SFMTA_STATIONS,
  PANE_Z_FIRE_STATIONS,
  PANE_Z_POLICE_STATIONS,
} from '@/_core/tokens';

export default function useMapPanes(map: Map) {
  useEffect(() => {
    map.createPane(PARKS_LAYER).style.zIndex = PANE_Z_PARKS;
    map.createPane(NEIGHBORHOODS_LAYER).style.zIndex = PANE_Z_NEIGHBORHOODS;
    map.createPane(PRECINCTS_LAYER).style.zIndex = PANE_Z_PRECINCTS;
    map.createPane(DISTRICTS_LAYER).style.zIndex = PANE_Z_DISTRICTS;
    map.createPane(BART_LINES_LAYER).style.zIndex = PANE_Z_BART_LINES;
    map.createPane(CALTRAIN_LINES_LAYER).style.zIndex = PANE_Z_CALTRAIN_LINES;
    map.createPane(SFMTA_LINES_LAYER).style.zIndex = PANE_Z_SFMTA_LINES;
    map.createPane(BART_STATIONS_LAYER).style.zIndex = PANE_Z_BART_STATIONS;
    map.createPane(CALTRAIN_STATIONS_LAYER).style.zIndex = PANE_Z_CALTRAIN_STATIONS;
    map.createPane(SFMTA_STATIONS_LAYER).style.zIndex = PANE_Z_SFMTA_STATIONS;
    map.createPane(FIRE_STATIONS_LAYER).style.zIndex = PANE_Z_FIRE_STATIONS;
    map.createPane(POLICE_STATIONS_LAYER).style.zIndex = PANE_Z_POLICE_STATIONS;
  }, [map]);
}
