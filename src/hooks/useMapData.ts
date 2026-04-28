import { useState, useEffect, useRef } from 'react';
import type { FeatureCollection, Geometry } from 'geojson';

import { api } from '@/_api';
import { useControlPanel } from '@/hooks/useControlPanel';
import { lazyLoad } from '@/_core/lib/lazyLoad';
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
  const { controls } = useControlPanel();
  const fetched = useRef(new Set<string>());

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

  const { boundaries, transportation, civics } = controls;

  useEffect(() => {
    const f = fetched.current;
    lazyLoad('neighborhoods', boundaries.visible && boundaries.neighborhoods.visible, f, api.public.fetchNeighborhoods, setNeighborhoods);
    lazyLoad('precincts',     boundaries.visible && boundaries.precincts.visible,     f, api.public.fetchPrecincts,     setPrecincts);
    lazyLoad('districts',     boundaries.visible && boundaries.districts.visible,     f, api.public.fetchDistricts,     setDistricts);
    lazyLoad('sfmta',         transportation.visible,                                 f, api.public.fetchSFMTATransit,  setSfmtaTransit);
    lazyLoad('bart',          transportation.visible && transportation.bart.visible,  f, api.public.fetchBARTTransit,   setBartTransit);
    lazyLoad('caltrain',      transportation.visible && transportation.caltrain.visible, f, api.public.fetchCaltrainTransit, setCaltrainTransit);
    lazyLoad('firePolice',    civics.visible && (civics.fireStations.visible || civics.policeStations.visible), f, api.public.fetchFirePoliceStations, setFirePoliceStations);
    lazyLoad('parks',         civics.visible && civics.parks.visible,                 f, api.public.fetchParks,         setParks);
  }, [boundaries, transportation, civics]);

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
