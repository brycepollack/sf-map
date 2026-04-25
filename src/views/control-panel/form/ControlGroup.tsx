import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

interface ControlGroupProps {
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
  children: React.ReactNode;
}

export default function ControlGroup({
  label,
  checked,
  onCheckedChange,
  children,
}: ControlGroupProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className="flex items-center rounded-md px-2 py-1 hover:bg-muted transition-colors cursor-pointer"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex items-center gap-2 flex-1">
          <Checkbox
            checked={checked}
            onCheckedChange={onCheckedChange}
            onClick={e => e.stopPropagation()}
          />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <ChevronRight
            className={`size-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </div>
      {expanded && <div className="ml-6">{children}</div>}
    </>
  );
}
