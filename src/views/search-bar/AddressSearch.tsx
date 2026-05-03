import { useState, useEffect } from 'react';
import { XIcon } from 'lucide-react';

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import { Popover, PopoverAnchor } from '@/components/ui/popover';
import useDebounce from '@/hooks/useDebounce';
import { api } from '@/_api';
import type { Marker, SearchAddressResult } from '@/_core/types';

interface AddressSearchProps {
  onSelect: (marker: Marker | null) => void;
}

export default function AddressSearch({ onSelect }: AddressSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchAddressResult[]>([]);
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    async function fetchSuggestions() {
      try {
        const data = await api.nominatim.searchAddress({ q: debouncedQuery });
        setSuggestions(data);
        setOpen(data.length > 0);
      } catch {
        setSuggestions([]);
        setOpen(false);
      }
    }

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSelect = (suggestion: SearchAddressResult) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    const label = suggestion.display_name;
    setQuery(label);
    setSuggestions([]);
    setOpen(false);
    onSelect({ lat, lng, label });
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setOpen(false);
    onSelect(null);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-1000 w-[calc(100vw-2rem)] max-w-96">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <Command shouldFilter={false} className="rounded-xl border shadow-md">
            <CommandInput
              placeholder="Search address..."
              value={query}
              onValueChange={setQuery}
              suffix={
                query && (
                  <button onClick={handleClear}>
                    <XIcon className="size-4 opacity-50 hover:opacity-100" />
                  </button>
                )
              }
            />
            {open && (
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {suggestions.map((s, i) => (
                  <CommandItem key={i} value={String(i)} onSelect={() => handleSelect(s)}>
                    {s.display_name}
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </Command>
        </PopoverAnchor>
      </Popover>
    </div>
  );
}
