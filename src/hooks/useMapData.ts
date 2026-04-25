import { useState, useEffect } from 'react';
import type { FeatureCollection, Geometry } from 'geojson';

import { api } from '@/_api';
import type {
  SFFindNeighborhoodsProperties,
  DataSFPrecinctsProperties,
  DataSFDistrictsProperties,
  SFMTATransitProperties,
  BARTTransitProperties,
  CaltrainTransitProperties,
  DataSFFirePoliceStationProperties,
  DataSFParksProperties,
} from '@/_core/types';

export default function useMapData() {
  const [neighborhoods, setNeighborhoods] = useState<FeatureCollection<
    Geometry,
    SFFindNeighborhoodsProperties
  > | null>(null);
  const [precincts, setPrecincts] = useState<FeatureCollection<
    Geometry,
    DataSFPrecinctsProperties
  > | null>(null);
  const [districts, setDistricts] = useState<FeatureCollection<
    Geometry,
    DataSFDistrictsProperties
  > | null>(null);
  const [sfmtaTransit, setSfmtaTransit] = useState<FeatureCollection<
    Geometry,
    SFMTATransitProperties
  > | null>(null);
  const [bartTransit, setBartTransit] = useState<FeatureCollection<
    Geometry,
    BARTTransitProperties
  > | null>(null);
  const [caltrainTransit, setCaltrainTransit] = useState<FeatureCollection<
    Geometry,
    CaltrainTransitProperties
  > | null>(null);
  const [firePoliceStations, setFirePoliceStations] = useState<FeatureCollection<
    Geometry,
    DataSFFirePoliceStationProperties
  > | null>(null);
  const [parks, setParks] = useState<FeatureCollection<Geometry, DataSFParksProperties> | null>(
    null,
  );

  useEffect(() => {
    api.public.fetchNeighborhoods().then(setNeighborhoods);
    api.public.fetchPrecincts().then(setPrecincts);
    api.public.fetchDistricts().then(setDistricts);
    api.public.fetchSFMTATransit().then(setSfmtaTransit);
    api.public.fetchBARTTransit().then(setBartTransit);
    api.public.fetchCaltrainTransit().then(setCaltrainTransit);
    api.public.fetchFirePoliceStations().then(setFirePoliceStations);
    api.public.fetchParks().then(setParks);
  }, []);

  return {
    neighborhoods,
    precincts,
    districts,
    sfmtaTransit,
    bartTransit,
    caltrainTransit,
    firePoliceStations,
    parks,
  };
}
