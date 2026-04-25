import {
  BART_LINES_LAYER,
  BART_STATIONS_LAYER,
  SFMTA_LINES_LAYER,
  SFMTA_STATIONS_LAYER,
  NEIGHBORHOODS_LAYER,
  PRECINCTS_LAYER,
  DISTRICTS_LAYER,
  CALTRAIN_LINES_LAYER,
  CALTRAIN_STATIONS_LAYER,
  FIRE_STATIONS_LAYER,
  POLICE_STATIONS_LAYER,
  PARKS_LAYER,
} from '@/_core/constants';
import {
  COLOR_TRANSIT_HOVER,
  WEIGHT_TRANSIT_HOVER,
  FILL_OPACITY_HOVER,
  STATION_MARKER_BORDER_WIDTH,
  STATION_MARKER_COLOR_HOVER,
} from '@/_core/tokens';
import type { Feature, Geometry } from 'geojson';
import type { OnFeatureClick, OnEachFeaturePathFn, OnEachFeatureMarkerFn } from '@/_core/types';
import type { LeafletMouseEvent, Marker, Path, PathOptions } from 'leaflet';

function onEachBARTLine(): OnEachFeaturePathFn {
  return function (feature: Feature<Geometry>, layer: Path) {
    const originalColor = (layer.options as PathOptions).color;
    const originalWeight = (layer.options as PathOptions).weight;
    const label = feature.properties?.name ?? 'Unknown';

    layer.bindTooltip(label, {
      direction: 'top',
      sticky: true,
    });

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ color: COLOR_TRANSIT_HOVER, weight: WEIGHT_TRANSIT_HOVER });
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ color: originalColor, weight: originalWeight });
      },
    });
  };
}

function onEachCaltrainLine(): OnEachFeaturePathFn {
  return function (_feature: Feature<Geometry>, layer: Path) {
    const originalColor = (layer.options as PathOptions).color;
    const originalWeight = (layer.options as PathOptions).weight;
    const label = 'Caltrain';

    layer.bindTooltip(label, {
      direction: 'top',
      sticky: true,
    });

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ color: COLOR_TRANSIT_HOVER, weight: WEIGHT_TRANSIT_HOVER });
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ color: originalColor, weight: originalWeight });
      },
    });
  };
}

function onEachSFMTALine(): OnEachFeaturePathFn {
  return function (feature: Feature<Geometry>, layer: Path) {
    const originalColor = (layer.options as PathOptions).color;
    const originalWeight = (layer.options as PathOptions).weight;
    const label = feature.properties?.name ?? 'Unknown';

    layer.bindTooltip(label, {
      direction: 'top',
      sticky: true,
    });

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ color: COLOR_TRANSIT_HOVER, weight: WEIGHT_TRANSIT_HOVER });
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ color: originalColor, weight: originalWeight });
      },
    });
  };
}

function onEachTransitStation(): OnEachFeatureMarkerFn {
  return function (feature: Feature<Geometry>, layer: Marker) {
    layer.once('add', () => {
      const label = feature.properties?.name ?? 'Unknown';
      const el = layer.getElement()?.querySelector<HTMLElement>('div');
      const originalBackground = el?.style.background ?? '';
      const originalBorder = el?.style.border ?? '';

      layer.bindTooltip(label, {
        direction: 'top',
        sticky: true,
      });

      layer.on({
        mouseover: () => {
          const el = layer.getElement()?.querySelector<HTMLElement>('div');
          if (el) {
            el.style.background = STATION_MARKER_COLOR_HOVER;
            el.style.border = `${STATION_MARKER_BORDER_WIDTH} solid ${STATION_MARKER_COLOR_HOVER}`;
          }
        },
        mouseout: () => {
          const el = layer.getElement()?.querySelector<HTMLElement>('div');
          if (el) {
            el.style.background = originalBackground;
            el.style.border = originalBorder;
          }
        },
      });
    });
  };
}

function onEachNeighborhood(onFeatureClick?: OnFeatureClick): OnEachFeaturePathFn {
  return function (feature: Feature<Geometry>, layer: Path) {
    const label = feature.properties?.name ?? 'Unknown';
    const originalFillOpacity = (layer.options as PathOptions).fillOpacity;

    layer.bindTooltip(label, { direction: 'top', sticky: true });

    layer.on({
      click: () =>
        onFeatureClick?.({
          title: label,
          layer: NEIGHBORHOODS_LAYER,
          properties: feature.properties ?? undefined,
        }),
      mouseover: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: FILL_OPACITY_HOVER });
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: originalFillOpacity });
      },
    });
  };
}

function onEachPrecinct(onFeatureClick?: OnFeatureClick): OnEachFeaturePathFn {
  return function (feature: Feature<Geometry>, layer: Path) {
    const label = `Precinct ${feature.properties?.prec_2022 ?? 'Unknown'}`;
    const originalFillOpacity = (layer.options as PathOptions).fillOpacity;

    layer.bindTooltip(label, { direction: 'top', sticky: true });

    layer.on({
      click: () =>
        onFeatureClick?.({
          title: label,
          layer: PRECINCTS_LAYER,
          properties: feature.properties ?? undefined,
        }),
      mouseover: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: FILL_OPACITY_HOVER });
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: originalFillOpacity });
      },
    });
  };
}

function onEachDistrict(onFeatureClick?: OnFeatureClick): OnEachFeaturePathFn {
  return function (feature: Feature<Geometry>, layer: Path) {
    const label = `District ${feature.properties?.sup_dist ?? 'Unknown'}`;
    const originalFillOpacity = (layer.options as PathOptions).fillOpacity;

    layer.bindTooltip(label, { direction: 'top', sticky: true });

    layer.on({
      click: () =>
        onFeatureClick?.({
          title: label,
          layer: DISTRICTS_LAYER,
          properties: feature.properties ?? undefined,
        }),
      mouseover: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: FILL_OPACITY_HOVER });
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: originalFillOpacity });
      },
    });
  };
}

function onEachPark(): OnEachFeaturePathFn {
  return function (feature: Feature<Geometry>, layer: Path) {
    const label = feature.properties?.map_park_n ?? 'Unknown';
    const originalFillOpacity = (layer.options as PathOptions).fillOpacity;

    layer.bindTooltip(label, {
      direction: 'top',
      sticky: true,
    });

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: FILL_OPACITY_HOVER });
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: originalFillOpacity });
      },
    });
  };
}

function onEachCivicStation(
  layerName: string,
  onFeatureClick?: OnFeatureClick,
): OnEachFeatureMarkerFn {
  return function (feature: Feature<Geometry>, layer: Marker) {
    const label = feature.properties?.common_name ?? 'Unknown';

    layer.bindTooltip(label, {
      direction: 'top',
      sticky: true,
    });

    layer.on({
      click: () =>
        onFeatureClick?.({
          title: label,
          layer: layerName,
          properties: feature.properties ?? undefined,
        }),
    });
  };
}

export function onEachFeatureFactory(
  layerName: string,
  onFeatureClick?: OnFeatureClick,
): OnEachFeaturePathFn | OnEachFeatureMarkerFn | undefined {
  switch (layerName) {
    case BART_LINES_LAYER:
      return onEachBARTLine();
    case CALTRAIN_LINES_LAYER:
      return onEachCaltrainLine();
    case SFMTA_LINES_LAYER:
      return onEachSFMTALine();
    case BART_STATIONS_LAYER:
    case CALTRAIN_STATIONS_LAYER:
    case SFMTA_STATIONS_LAYER:
      return onEachTransitStation();
    case NEIGHBORHOODS_LAYER:
      return onEachNeighborhood(onFeatureClick);
    case PRECINCTS_LAYER:
      return onEachPrecinct(onFeatureClick);
    case DISTRICTS_LAYER:
      return onEachDistrict(onFeatureClick);
    case FIRE_STATIONS_LAYER:
    case POLICE_STATIONS_LAYER:
      return onEachCivicStation(layerName, onFeatureClick);
    case PARKS_LAYER:
      return onEachPark();
    default:
      break;
  }
}
