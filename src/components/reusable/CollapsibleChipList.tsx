import { useState } from 'react';

interface CollapsibleChipListProps {
  items: string[];
  limit?: number;
}

export default function CollapsibleChipList({ items, limit = 5 }: CollapsibleChipListProps) {
  const [showAll, setShowAll] = useState(false);

  if (!items.length) return <p className="text-sm text-muted-foreground">None</p>;

  const visible = showAll ? items : items.slice(0, limit);
  const overflowing = items.length > limit;

  return (
    <>
      <div className="flex flex-wrap gap-1">
        {visible.map(item => (
          <span key={item} className="text-xs bg-muted rounded px-1.5 py-0.5">
            {item}
          </span>
        ))}
        {!showAll && overflowing && (
          <span className="text-xs bg-muted rounded px-1.5 py-0.5">...</span>
        )}
      </div>
      {overflowing && (
        <button
          className="text-xs text-muted-foreground hover:text-foreground mt-1 transition-colors"
          onClick={() => setShowAll(v => !v)}
        >
          {showAll ? 'Show less ↑' : `Show all ${items.length} ↓`}
        </button>
      )}
    </>
  );
}
