import { readFileSync, writeFileSync } from 'fs';
import booleanIntersects from '@turf/boolean-intersects';

const neighborhoods = JSON.parse(readFileSync('./public/sffind_neighborhoods.geojson', 'utf8'));
const precincts = JSON.parse(readFileSync('./public/datasf_precincts.geojson', 'utf8'));
const districts = JSON.parse(readFileSync('./public/datasf_districts.geojson', 'utf8'));

// datasf_districts.geojson already has one feature per district
const uniqueDistricts = districts.features;

// Neighborhoods map: neighborhood name → { precincts, districts }
const neighborhoodsMap = {};

for (const neighborhood of neighborhoods.features) {
  const neighborhoodName = neighborhood.properties.name;

  const matchedPrecincts = precincts.features
    .filter(p => booleanIntersects(neighborhood, p))
    .map(p => p.properties.prec_2022);

  const matchedDistricts = uniqueDistricts
    .filter(d => booleanIntersects(neighborhood, d))
    .map(d => d.properties.sup_dist);

  neighborhoodsMap[neighborhoodName] = {
    precincts: matchedPrecincts,
    districts: matchedDistricts,
  };
}

// Districts map: sup_dist → { precincts, neighborhoods }
const districtsMap = {};

for (const district of uniqueDistricts) {
  const districtId = district.properties.sup_dist;

  const matchedPrecincts = precincts.features
    .filter(p => booleanIntersects(district, p))
    .map(p => p.properties.prec_2022);

  const matchedNeighborhoods = neighborhoods.features
    .filter(n => booleanIntersects(district, n))
    .map(n => n.properties.name);

  districtsMap[districtId] = {
    precincts: matchedPrecincts,
    neighborhoods: matchedNeighborhoods,
  };
}

// Precincts map: prec_2022 → { district, neighborhoods }
const precinctsMap = {};

for (const precinct of precincts.features) {
  const precinctId = precinct.properties.prec_2022;

  const matchedDistrict = uniqueDistricts
    .find(d => booleanIntersects(precinct, d))
    ?.properties.sup_dist ?? null;

  const matchedNeighborhoods = neighborhoods.features
    .filter(n => booleanIntersects(precinct, n))
    .map(n => n.properties.name);

  precinctsMap[precinctId] = {
    district: matchedDistrict,
    neighborhoods: matchedNeighborhoods,
  };
}

writeFileSync('./public/neighborhoods_relationships.json', JSON.stringify(neighborhoodsMap, null, 2));
writeFileSync('./public/districts_relationships.json', JSON.stringify(districtsMap, null, 2));
writeFileSync('./public/precincts_relationships.json', JSON.stringify(precinctsMap, null, 2));

console.log(`Done.`);
console.log(`  Neighborhoods: ${Object.keys(neighborhoodsMap).length}`);
console.log(`  Districts: ${Object.keys(districtsMap).length}`);
console.log(`  Precincts: ${Object.keys(precinctsMap).length}`);
