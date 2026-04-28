import lineOffset from '@turf/line-offset';
import type { Feature, FeatureCollection, Geometry, LineString } from 'geojson';
import { BART_TRACK_OFFSETS, COLOR_FALLBACK } from '@/_core/tokens';
import type {
  BARTTransitProperties,
  CaltrainTransitProperties,
  DataSFFirePoliceStationProperties,
  SFMTATransitProperties,
  Controls,
} from '@/_core/types';

export function transformBARTLines(
  data: FeatureCollection<Geometry, BARTTransitProperties>,
): FeatureCollection<Geometry, BARTTransitProperties> {
  const features: Feature<Geometry, BARTTransitProperties>[] = [];

  for (const feature of data.features.filter(
    f => f.geometry.type === 'LineString' || f.geometry.type === 'MultiLineString',
  )) {
    const color = feature.properties?.color ?? COLOR_FALLBACK;
    const offsetKm = BART_TRACK_OFFSETS[color] ?? 0;
    const coordArrays =
      feature.geometry.type === 'LineString'
        ? [(feature.geometry as LineString).coordinates]
        : (feature.geometry as GeoJSON.MultiLineString).coordinates;

    for (const rawCoords of coordArrays) {
      const coords = rawCoords.filter(
        (c, i) => i === 0 || c[0] !== rawCoords[i - 1][0] || c[1] !== rawCoords[i - 1][1],
      );
      const lineString: Feature<LineString, BARTTransitProperties> = {
        type: 'Feature',
        properties: { color, name: feature.properties?.name },
        geometry: { type: 'LineString', coordinates: coords },
      };
      features.push(
        offsetKm !== 0
          ? (lineOffset(lineString, offsetKm, { units: 'kilometers' }) as Feature<LineString, BARTTransitProperties>)
          : lineString,
      );
    }
  }

  return { ...data, features };
}

export function transformCaltrainLines(
  data: FeatureCollection<Geometry, CaltrainTransitProperties>,
): FeatureCollection<Geometry, CaltrainTransitProperties> {
  return {
    ...data,
    features: data.features.filter(
      f => f.geometry.type === 'LineString' || f.geometry.type === 'MultiLineString',
    ),
  };
}

export function transformStations<P>(data: FeatureCollection<Geometry, P>): FeatureCollection<Geometry, P> {
  return { ...data, features: data.features.filter(f => f.geometry.type === 'Point') };
}

export function transformFireStations(
  data: FeatureCollection<Geometry, DataSFFirePoliceStationProperties>,
): FeatureCollection<Geometry, DataSFFirePoliceStationProperties> {
  return { ...data, features: data.features.filter(f => f.properties?.jurisdiction === 'Fire Department') };
}

export function transformPoliceStations(
  data: FeatureCollection<Geometry, DataSFFirePoliceStationProperties>,
): FeatureCollection<Geometry, DataSFFirePoliceStationProperties> {
  return { ...data, features: data.features.filter(f => f.properties?.jurisdiction === 'Police Department') };
}

export function transformSFMTALines(
  data: FeatureCollection<Geometry, SFMTATransitProperties>,
  controls: Controls,
): FeatureCollection<Geometry, SFMTATransitProperties> {
  return {
    ...data,
    features: data.features
      .filter(f => {
        if (f.geometry.type !== 'LineString' && f.geometry.type !== 'MultiLineString') return false;
        const routeType = Number(f.properties?.type);
        if (routeType === 0) return controls.transportation.metro.visible;
        if (routeType === 3) return controls.transportation.buses.visible;
        if (routeType === 5) return controls.transportation.cableCar.visible;
        return false;
      })
      .sort((a, b) => {
        const order = (type: number) => (type === 3 ? 0 : type === 5 ? 1 : 2);
        return order(Number(a.properties?.type)) - order(Number(b.properties?.type));
      }),
  };
}

export function transformSFMTAStations(
  data: FeatureCollection<Geometry, SFMTATransitProperties>,
  controls: Controls,
): FeatureCollection<Geometry, SFMTATransitProperties> {
  return {
    ...data,
    features: data.features.filter(f => {
      if (f.geometry.type !== 'Point') return false;
      const routeType = Number(f.properties?.type);
      if (routeType === 0) return controls.transportation.metro.visible;
      if (routeType === 3) return controls.transportation.buses.visible;
      if (routeType === 5) return controls.transportation.cableCar.visible;
      return false;
    }),
  };
}
