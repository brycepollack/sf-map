import { useState } from 'react';

import type { Controls } from '@/_core/types';
import { DEFAULT_CONTROLS } from '@/_core/constants';
import { ControlPanelContext } from '@/hooks/useControlPanel';

export function ControlPanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [controls, setControls] = useState<Controls>(DEFAULT_CONTROLS);

  const toggleControl = (path: string) => {
    setControls(prev => {
      const updated = structuredClone(prev);
      const keys = path.split('.');
      let current: Record<string, unknown> = updated as Record<string, unknown>;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }
      const finalKey = keys[keys.length - 1];
      current[finalKey] = !current[finalKey];
      return updated;
    });
  };

  return (
    <ControlPanelContext.Provider value={{ open, setOpen, controls, toggleControl }}>
      {children}
    </ControlPanelContext.Provider>
  );
}
