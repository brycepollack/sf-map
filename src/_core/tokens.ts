// Z index pane stacking order

export const PANE_Z_NEIGHBORHOODS = '200';
export const PANE_Z_PRECINCTS = '201';
export const PANE_Z_DISTRICTS = '202';
export const PANE_Z_PARKS = '203';
export const PANE_Z_BART_LINES = '300';
export const PANE_Z_CALTRAIN_LINES = '350';
export const PANE_Z_SFMTA_LINES = '400';
export const PANE_Z_BART_STATIONS = '500';
export const PANE_Z_CALTRAIN_STATIONS = '550';
export const PANE_Z_SFMTA_STATIONS = '600';
export const PANE_Z_FIRE_STATIONS = '650';
export const PANE_Z_POLICE_STATIONS = '651';

// Colors

export const COLOR_FALLBACK = '#888888';
export const COLOR_BOUNDARY = '#ffffff';
export const COLOR_NEIGHBORHOOD_FILL = '#7eb8d4';
export const SUPE_COLORS: Record<string, string> = {
  '1': '#0d1670',
  '2': '#eb6d05',
  '3': '#279d9a',
  '4': '#0099e8',
  '5': '#7e5acc',
  '6': '#d5006d',
  '7': '#9389ad',
  '8': '#472917',
  '9': '#0b625f',
  '10': '#205c89',
  '11': '#4f397d',
};
export const COLOR_BUS = '#f97316';
export const COLOR_CABLE_CAR = '#92400e';
export const COLOR_CALTRAIN = '#9b2335';
export const COLOR_PARKS_FILL = '#4ade80';

// Weights

export const WEIGHT_BART = 3;
export const WEIGHT_METRO = 5;
export const WEIGHT_BUS = 2;
export const WEIGHT_CABLE_CAR = 4;
export const WEIGHT_CALTRAIN = 3;
export const WEIGHT_NEIGHBORHOOD = 1;
export const WEIGHT_PRECINCT_DISTRICT = 0.5;

// Opacities

export const OPACITY_TRANSIT = 0.9;
export const FILL_OPACITY_NEIGHBORHOOD = 0;
export const FILL_OPACITY_PRECINCT_DISTRICT = 0.3;
export const FILL_OPACITY_PARKS = 0.3;

// Hover styles

export const COLOR_TRANSIT_HOVER = '#0000ff';
export const WEIGHT_TRANSIT_HOVER = 5;
export const FILL_OPACITY_HOVER = 0.5;

// Station markers

export const STATION_MARKER_SIZE = 10;
export const CIVIC_STATION_MARKER_SIZE = 15;
export const STATION_MARKER_COLOR_BG = '#ffffff';
export const STATION_MARKER_COLOR_BORDER = '#333333';
export const STATION_MARKER_BORDER_WIDTH = '1.5px';
export const STATION_MARKER_COLOR_HOVER = '#0000ff';
export const FIRE_STATION_MARKER_COLOR = '#e63946';
export const POLICE_STATION_MARKER_COLOR = '#3b82f6';

// BART track offsets (to visually separate)

export const BART_TRACK_OFFSETS: Record<string, number> = {
  '#ed1c24': 0, // Red
  '#ffe800': 0.01, // Yellow
  '#4db848': 0.02, // Green
  '#00aeef': 0.03, // Blue
  '#faa61a': 0.04, // Orange
};
