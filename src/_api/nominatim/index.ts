import { SF_BBOX } from '@/_core/constants';
import type { SearchAddressParams, SearchAddressResult } from '@/_core/types';

export async function searchAddress(params: SearchAddressParams): Promise<SearchAddressResult[]> {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', params.q);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', String(params.limit ?? 5));
  url.searchParams.set('countrycodes', 'us');
  url.searchParams.set('viewbox', SF_BBOX);
  url.searchParams.set('bounded', '1');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Nominatim error: ${res.status}`);
  return res.json();
}
