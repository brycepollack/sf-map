import { createContext, useContext, useState } from 'react';

import type { Controls } from '@/_core/types';
import { DEFAULT_CONTROLS } from '@/_core/constants';

interface ControlPanelContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  controls: Controls;
  toggleControl: (path: string) => void;
}

const ControlPanelContext = createContext<ControlPanelContextValue | null>(null);

export function ControlPanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [controls, setControls] = useState<Controls>(DEFAULT_CONTROLS);

  const toggleControl = (path: string) => {
    setControls(prev => {
      const updated = structuredClone(prev);
      const keys = path.split('.');
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
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

export function useControlPanel() {
  const ctx = useContext(ControlPanelContext);
  if (!ctx) throw new Error('useControlPanel must be used within ControlPanelProvider');
  return ctx;
}
