import { SF_BBOX } from '@/_core/constants';
import type { SearchAddressParams, SearchAddressResult } from '@/_core/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function searchAddress(
  params: SearchAddressParams,
  signal?: AbortSignal,
): Promise<SearchAddressResult[]> {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', params.q);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', String(params.limit ?? 5));
  url.searchParams.set('countrycodes', 'us');
  url.searchParams.set('viewbox', SF_BBOX);
  url.searchParams.set('bounded', '1');

  // Nominatim intermittently rejects requests with a 425 (Too Early)
  const attempts = 3;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, { cache: 'no-store', signal });
      if (!res.ok) throw new Error(`Nominatim error: ${res.status}`);
      return res.json();
    } catch (err) {
      // The caller aborted
      if (signal?.aborted) throw err;
      if (attempt === attempts) throw err;
      await delay(300 * attempt);
    }
  }

  return [];
}
