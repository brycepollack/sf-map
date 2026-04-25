import type { FeatureCollection, Geometry } from 'geojson';

import type {
  SFFindNeighborhoodsProperties,
  DataSFPrecinctsProperties,
  DataSFDistrictsProperties,
  SFMTATransitProperties,
  BARTTransitProperties,
  CaltrainTransitProperties,
  DataSFFirePoliceStationProperties,
  DataSFParksProperties,
  NeighborhoodsRelationshipsMap,
  DistrictsRelationshipsMap,
  DistrictsData,
  PrecinctsRelationshipsMap,
} from '@/_core/types';

export async function fetchNeighborhoods(): Promise<
  FeatureCollection<Geometry, SFFindNeighborhoodsProperties>
> {
  const url = '/geojson/sffind_neighborhoods.geojson';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch neighborhoods: ${res.status}`);
  return res.json();
}

export async function fetchPrecincts(): Promise<
  FeatureCollection<Geometry, DataSFPrecinctsProperties>
> {
  const url = '/geojson/datasf_precincts.geojson';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch precincts: ${res.status}`);
  return res.json();
}

export async function fetchDistricts(): Promise<
  FeatureCollection<Geometry, DataSFDistrictsProperties>
> {
  const url = '/geojson/datasf_districts.geojson';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch districts: ${res.status}`);
  return res.json();
}

export async function fetchSFMTATransit(): Promise<
  FeatureCollection<Geometry, SFMTATransitProperties>
> {
  const url = '/geojson/sfmta_transit.geojson';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch SFMTA transit: ${res.status}`);
  return res.json();
}

export async function fetchBARTTransit(): Promise<
  FeatureCollection<Geometry, BARTTransitProperties>
> {
  const url = '/geojson/bart_transit.geojson';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch BART transit: ${res.status}`);
  return res.json();
}

export async function fetchCaltrainTransit(): Promise<
  FeatureCollection<Geometry, CaltrainTransitProperties>
> {
  const url = '/geojson/caltrain_transit.geojson';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch Caltrain transit: ${res.status}`);
  return res.json();
}

export async function fetchFirePoliceStations(): Promise<
  FeatureCollection<Geometry, DataSFFirePoliceStationProperties>
> {
  const url = '/geojson/datasf_fire_police_stations.geojson';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch fire/police stations: ${res.status}`);
  return res.json();
}

export async function fetchParks(): Promise<FeatureCollection<Geometry, DataSFParksProperties>> {
  const url = '/geojson/datasf_parks.geojson';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch parks: ${res.status}`);
  return res.json();
}

export async function fetchNeighborhoodsRelationshipsMap(): Promise<NeighborhoodsRelationshipsMap> {
  const url = '/json/neighborhoods_relationships.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch relationships: ${res.status}`);
  return res.json();
}

export async function fetchDistrictsRelationshipsMap(): Promise<DistrictsRelationshipsMap> {
  const url = '/json/districts_relationships.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch relationships: ${res.status}`);
  return res.json();
}

export async function fetchDistrictsData(): Promise<DistrictsData> {
  const url = '/json/districts_data.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch districts data: ${res.status}`);
  return res.json();
}

export async function fetchPrecinctsRelationshipsMap(): Promise<PrecinctsRelationshipsMap> {
  const url = '/json/precincts_relationships.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch relationships: ${res.status}`);
  return res.json();
}
