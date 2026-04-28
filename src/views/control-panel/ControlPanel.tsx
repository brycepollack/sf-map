import { Layers, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useControlPanel } from '@/hooks/useControlPanel';
import { Button } from '@/components/ui/button';
import { cn } from '@/_core/lib/shadcn';
import ControlForm from '@/views/control-panel/form/ControlForm';

export default function ControlPanel() {
  const { open, setOpen } = useControlPanel();
  return (
    <div className="absolute bottom-4 left-4 z-1000">
      {/* Toggle button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="bg-background border shadow-md rounded-full w-12 h-12 flex items-center justify-center"
          >
            <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
              <Layers className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <motion.div
        initial={false}
        animate={
          open
            ? { opacity: 1, scale: 1, height: 'auto', pointerEvents: 'auto' }
            : { opacity: 0, scale: 0.95, height: 0, pointerEvents: 'none' }
        }
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={cn(
          'bg-background border shadow-md rounded-xl overflow-hidden',
          !open && 'absolute bottom-0',
        )}
      >
        <div className="p-3 space-y-3 w-64">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Controls</span>
            <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
              <XIcon className="size-4" />
            </Button>
          </div>

          <div className="max-h-70 overflow-y-auto">
            <ControlForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
