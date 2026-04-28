import { createContext, useContext } from 'react';

import type { Controls } from '@/_core/types';

export interface ControlPanelContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  controls: Controls;
  toggleControl: (path: string) => void;
}

export const ControlPanelContext = createContext<ControlPanelContextValue | null>(null);

export function useControlPanel() {
  const ctx = useContext(ControlPanelContext);
  if (!ctx) throw new Error('useControlPanel must be used within ControlPanelProvider');
  return ctx;
}
