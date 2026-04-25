import type { PathOptions } from 'leaflet';
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
  PARKS_LAYER,
} from '@/_core/constants';
import {
  SUPE_COLORS,
  COLOR_FALLBACK,
  COLOR_BOUNDARY,
  COLOR_BUS,
  COLOR_CABLE_CAR,
  COLOR_CALTRAIN,
  COLOR_NEIGHBORHOOD_FILL,
  COLOR_PARKS_FILL,
  WEIGHT_BART,
  WEIGHT_CALTRAIN,
  WEIGHT_METRO,
  WEIGHT_BUS,
  WEIGHT_CABLE_CAR,
  WEIGHT_NEIGHBORHOOD,
  WEIGHT_PRECINCT_DISTRICT,
  OPACITY_TRANSIT,
  FILL_OPACITY_NEIGHBORHOOD,
  FILL_OPACITY_PRECINCT_DISTRICT,
  FILL_OPACITY_PARKS,
} from '@/_core/tokens';

function styleBART(feature: any): PathOptions {
  return {
    color: feature?.properties?.color ?? COLOR_FALLBACK,
    weight: WEIGHT_BART,
    opacity: OPACITY_TRANSIT,
  };
}

function styleSFMTA(feature: any): PathOptions {
  const routeType = Number(feature?.properties?.type);

  let color = COLOR_FALLBACK;
  let weight = 1;

  switch (routeType) {
    case 0: // metro
      color = feature?.properties?.color;
      weight = WEIGHT_METRO;
      break;

    case 3: // bus
      color = COLOR_BUS;
      weight = WEIGHT_BUS;
      break;

    case 5: // cable car
      color = COLOR_CABLE_CAR;
      weight = WEIGHT_CABLE_CAR;
      break;

    default:
      break;
  }

  return {
    color,
    weight,
    opacity: OPACITY_TRANSIT,
    lineCap: 'round',
    lineJoin: 'round',
    ...(routeType === 3 && { dashArray: '4 3' }),
  };
}

function styleCaltrain(): PathOptions {
  return {
    color: COLOR_CALTRAIN,
    weight: WEIGHT_CALTRAIN,
    opacity: OPACITY_TRANSIT,
  };
}

function styleNeighborhoods(): PathOptions {
  return {
    color: COLOR_BOUNDARY,
    weight: WEIGHT_NEIGHBORHOOD,
    fillColor: COLOR_NEIGHBORHOOD_FILL,
    fillOpacity: FILL_OPACITY_NEIGHBORHOOD,
  };
}

function stylePrecincts(feature: any): PathOptions {
  const supe = feature?.properties?.supe22;
  return {
    color: COLOR_BOUNDARY,
    weight: WEIGHT_PRECINCT_DISTRICT,
    fillColor: SUPE_COLORS[supe] ?? COLOR_FALLBACK,
    fillOpacity: FILL_OPACITY_PRECINCT_DISTRICT,
  };
}

function styleDistricts(feature: any): PathOptions {
  const supe = feature?.properties?.sup_dist;
  return {
    color: COLOR_BOUNDARY,
    weight: WEIGHT_PRECINCT_DISTRICT,
    fillColor: SUPE_COLORS[supe] ?? COLOR_FALLBACK,
    fillOpacity: FILL_OPACITY_PRECINCT_DISTRICT,
  };
}

function styleParks(): PathOptions {
  return {
    color: COLOR_PARKS_FILL,
    weight: 0,
    fillColor: COLOR_PARKS_FILL,
    fillOpacity: FILL_OPACITY_PARKS,
  };
}

export function styleGeoJSONFactory(layer: string): ((feature: any) => PathOptions) | undefined {
  switch (layer) {
    case BART_LINES_LAYER:
      return styleBART;
    case SFMTA_LINES_LAYER:
      return styleSFMTA;
    case CALTRAIN_LINES_LAYER:
      return styleCaltrain;
    case BART_STATIONS_LAYER:
    case CALTRAIN_STATIONS_LAYER:
    case SFMTA_STATIONS_LAYER:
      return undefined;
    case PARKS_LAYER:
      return styleParks;
    case NEIGHBORHOODS_LAYER:
      return styleNeighborhoods;
    case PRECINCTS_LAYER:
      return stylePrecincts;
    case DISTRICTS_LAYER:
      return styleDistricts;
    default:
      break;
  }
}
