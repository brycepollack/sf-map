#!/usr/bin/env node
/**
 * Merges segmented LineString/MultiLineString features in transit GeoJSON files
 * into a single LineString per route by chaining connected segments end-to-end.
 * Falls back to MultiLineString if segments form multiple disconnected branches.
 *
 * Usage: node scripts/merge-transit-lines.js
 */

import fs from 'fs';

const FILES = [
  'public/geojson/bart_transit.geojson',
  'public/geojson/caltrain_transit.geojson',
  'public/geojson/sfmta_transit.geojson',
];

const TOLERANCE = 1e-6;

function coordsEqual(a, b) {
  return Math.abs(a[0] - b[0]) < TOLERANCE && Math.abs(a[1] - b[1]) < TOLERANCE;
}

/**
 * Attempts to chain an array of coordinate arrays into as few continuous
 * LineStrings as possible by matching endpoints. Reverses segments as needed.
 * Returns an array of chained coordinate arrays.
 */
function chainSegments(segments) {
  if (segments.length <= 1) return segments;

  const pool = segments.map(s => s.slice());
  const chains = [];

  while (pool.length > 0) {
    let chain = pool.shift();
    let progress = true;

    while (progress && pool.length > 0) {
      progress = false;
      for (let i = 0; i < pool.length; i++) {
        const seg = pool[i];
        const head = chain[0];
        const tail = chain[chain.length - 1];
        const segStart = seg[0];
        const segEnd = seg[seg.length - 1];

        if (coordsEqual(tail, segStart)) {
          // Append seg (skip its first point, already in chain)
          chain = chain.concat(seg.slice(1));
          pool.splice(i, 1);
          progress = true;
          break;
        } else if (coordsEqual(tail, segEnd)) {
          // Append seg reversed (skip its last point, already in chain as tail)
          chain = chain.concat(seg.slice(0, -1).reverse());
          pool.splice(i, 1);
          progress = true;
          break;
        } else if (coordsEqual(head, segEnd)) {
          // Prepend seg (skip its last point, already in chain as head)
          chain = seg.slice(0, -1).concat(chain);
          pool.splice(i, 1);
          progress = true;
          break;
        } else if (coordsEqual(head, segStart)) {
          // Prepend seg reversed (skip its first point, already in chain as head)
          chain = seg.slice(1).reverse().concat(chain);
          pool.splice(i, 1);
          progress = true;
          break;
        }
      }
    }

    chains.push(chain);
  }

  return chains;
}

for (const filePath of FILES) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const points = data.features.filter(f => f.geometry?.type === 'Point');
  const lineFeatures = data.features.filter(
    f => f.geometry?.type === 'LineString' || f.geometry?.type === 'MultiLineString'
  );

  // Group line features by name. Unnamed segments (e.g. raw Caltrain track data)
  // all collapse into a single unnamed group.
  const groups = new Map();
  for (const feature of lineFeatures) {
    const key = feature.properties?.name ?? '__unnamed__';
    if (!groups.has(key)) {
      const props = key === '__unnamed__' ? {} : feature.properties;
      groups.set(key, { properties: props, segments: [] });
    }
    const { segments } = groups.get(key);
    if (feature.geometry.type === 'LineString') {
      segments.push(feature.geometry.coordinates);
    } else {
      segments.push(...feature.geometry.coordinates);
    }
  }

  const mergedLines = [...groups.values()].map(({ properties, segments }) => {
    const chains = chainSegments(segments);
    const isSingle = chains.length === 1;
    return {
      type: 'Feature',
      properties,
      geometry: isSingle
        ? { type: 'LineString', coordinates: chains[0] }
        : { type: 'MultiLineString', coordinates: chains },
    };
  });

  const output = {
    type: 'FeatureCollection',
    features: [...points, ...mergedLines],
  };

  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));

  const before = lineFeatures.length;
  mergedLines.forEach(f => {
    const sub = f.geometry.type === 'MultiLineString' ? f.geometry.coordinates.length : 1;
    const name = f.properties?.name ?? '(unnamed)';
    const type = f.geometry.type;
    console.log(`  ${name}: ${type}${sub > 1 ? ` (${sub} chains)` : ''}`);
  });
  console.log(`${filePath}: ${before} segment(s) → ${mergedLines.length} feature(s)\n`);
}

console.log('Done.');
