import { useEffect } from 'react';
import type { Map } from 'leaflet';

const PAN_AMOUNT = 100;

export default function useKeyboard(map: Map) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'ArrowUp':
          map!.panBy([0, -PAN_AMOUNT]);
          break;
        case 'w':
          map!.panBy([0, -PAN_AMOUNT]);
          break;
        case 'ArrowDown':
          map!.panBy([0, PAN_AMOUNT]);
          break;
        case 's':
          map!.panBy([0, PAN_AMOUNT]);
          break;
        case 'ArrowLeft':
          map!.panBy([-PAN_AMOUNT, 0]);
          break;
        case 'a':
          map!.panBy([-PAN_AMOUNT, 0]);
          break;
        case 'ArrowRight':
          map!.panBy([PAN_AMOUNT, 0]);
          break;
        case 'd':
          map!.panBy([PAN_AMOUNT, 0]);
          break;
        case '+':
          map!.zoomIn();
          break;
        case '=':
          map!.zoomIn();
          break;
        case '_':
          map!.zoomOut();
          break;
        case '-':
          map!.zoomOut();
          break;
        default:
          return;
      }

      e.preventDefault();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [map]);
}
