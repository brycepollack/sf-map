import type { FeatureCollection, Geometry } from 'geojson';

export function lazyLoad<T>(
  key: string,
  needed: boolean,
  fetched: Set<string>,
  fetcher: () => Promise<FeatureCollection<Geometry, T>>,
  setter: (data: FeatureCollection<Geometry, T>) => void,
) {
  if (needed && !fetched.has(key)) {
    fetched.add(key);
    fetcher().then(setter);
  }
}
