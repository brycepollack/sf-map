export type Controls = {
  boundaries: {
    visible: boolean;
    neighborhoods: { visible: boolean };
    precincts: { visible: boolean };
    districts: { visible: boolean };
  };
  transportation: {
    visible: boolean;
    metro: { visible: boolean };
    buses: { visible: boolean };
    cableCar: { visible: boolean };
    bart: { visible: boolean };
    caltrain: { visible: boolean };
  };
  civics: {
    visible: boolean;
    parks: { visible: boolean };
    fireStations: { visible: boolean };
    policeStations: { visible: boolean };
  };
};

export type Marker = {
  lat: number;
  lng: number;
  label: string;
};

export type SidePanelFeatureData = {
  title: string;
  layer: string;
  properties?: Record<string, unknown>;
};

export type OnFeatureClick = (data: SidePanelFeatureData) => void;

// Leaflet callback types
import type { Feature, Geometry } from 'geojson';
import type { Marker as LeafletMarker, Path } from 'leaflet';

export type OnEachFeaturePathFn = (feature: Feature<Geometry>, layer: Path) => void;
export type OnEachFeatureMarkerFn = (feature: Feature<Geometry>, layer: LeafletMarker) => void;

// Public API - GeoJSON feature property types
export type BARTTransitProperties = {
  name: string;
  color: string;
};

export type DataSFDistrictsProperties = {
  sup_name: string;
  sup_dist: string;
  sup_dist_name: string;
  sup_dist_num: string;
  sup_dist_pad: string;
};

export type DataSFPrecinctsProperties = {
  supe22: string;
  assemb22: string;
  cong22: string;
  bart22: string;
  boe22: string;
  sen22: string;
  neigh22: string;
  histnhood: string;
  prec_2022: string;
};

export type SFMTATransitProperties = {
  name: string;
  color: string;
  type: number;
};

export type SFFindNeighborhoodsProperties = {
  name: string;
  link: string;
};

export type CaltrainTransitProperties = {
  STATION: string;
  LOCATION: string;
  ADDRESS: string;
  ZIP: string;
  STATION_TY: number;
  CO: string;
};

export type DataSFParksProperties = {
  map_park_n: string;
  acres: string;
  sqft: string;
  perimeter: string;
  gis_fd_pk: string;
  x: string;
  y: string;
};

export type DataSFFirePoliceStationProperties = {
  facility_id: string;
  common_name: string;
  address: string;
  city: string;
  zip_code: string;
  jurisdiction: string;
  supervisor_district: string;
};

// Public API - JSON feature property types
export type NeighborhoodsRelationshipsMap = Record<
  string,
  { precincts: string[]; districts: string[] }
>;

export type DistrictsRelationshipsMap = Record<
  string,
  { neighborhoods: string[]; precincts: string[] }
>;

export type DistrictsData = Record<string, { supervisor: string }>;

export type PrecinctsRelationshipsMap = Record<
  string,
  { neighborhoods: string[]; district: string }
>;

// Nominatim API types
export interface SearchAddressParams {
  q: string;
  limit?: number;
}

export interface SearchAddressResult {
  lat: string;
  lon: string;
  display_name: string;
  name: string;
}
