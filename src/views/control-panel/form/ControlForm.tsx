import { useControlPanel } from '@/context/ControlPanelContext';
import ControlRow from '@/views/control-panel/form/ControlRow';
import ControlGroup from '@/views/control-panel/form/ControlGroup';

export default function ControlForm() {
  const { controls, toggleControl } = useControlPanel();

  return (
    <div>
      <ControlGroup
        label="Boundaries"
        checked={controls.boundaries.visible}
        onCheckedChange={() => toggleControl('boundaries.visible')}
      >
        <ControlRow
          label="Districts"
          checked={controls.boundaries.districts.visible}
          disabled={!controls.boundaries.visible}
          onCheckedChange={() => toggleControl('boundaries.districts.visible')}
        />
        <ControlRow
          label="Precincts"
          checked={controls.boundaries.precincts.visible}
          disabled={!controls.boundaries.visible}
          onCheckedChange={() => toggleControl('boundaries.precincts.visible')}
        />
        <ControlRow
          label="Neighborhoods"
          checked={controls.boundaries.neighborhoods.visible}
          disabled={!controls.boundaries.visible}
          onCheckedChange={() => toggleControl('boundaries.neighborhoods.visible')}
        />
      </ControlGroup>

      <ControlGroup
        label="Transportation"
        checked={controls.transportation.visible}
        onCheckedChange={() => toggleControl('transportation.visible')}
      >
        <ControlRow
          label="Metro"
          checked={controls.transportation.metro.visible}
          disabled={!controls.transportation.visible}
          onCheckedChange={() => toggleControl('transportation.metro.visible')}
        />
        <ControlRow
          label="BART"
          checked={controls.transportation.bart.visible}
          disabled={!controls.transportation.visible}
          onCheckedChange={() => toggleControl('transportation.bart.visible')}
        />
        <ControlRow
          label="Caltrain"
          checked={controls.transportation.caltrain.visible}
          disabled={!controls.transportation.visible}
          onCheckedChange={() => toggleControl('transportation.caltrain.visible')}
        />
        <ControlRow
          label="Cable Car"
          checked={controls.transportation.cableCar.visible}
          disabled={!controls.transportation.visible}
          onCheckedChange={() => toggleControl('transportation.cableCar.visible')}
        />
        <ControlRow
          label="Buses"
          checked={controls.transportation.buses.visible}
          disabled={!controls.transportation.visible}
          onCheckedChange={() => toggleControl('transportation.buses.visible')}
        />
      </ControlGroup>

      <ControlGroup
        label="Civic Services"
        checked={controls.civics.visible}
        onCheckedChange={() => toggleControl('civics.visible')}
      >
        <ControlRow
          label="Parks"
          checked={controls.civics.parks.visible}
          disabled={!controls.civics.visible}
          onCheckedChange={() => toggleControl('civics.parks.visible')}
        />
        <ControlRow
          label="Fire Stations"
          checked={controls.civics.fireStations.visible}
          disabled={!controls.civics.visible}
          onCheckedChange={() => toggleControl('civics.fireStations.visible')}
        />
        <ControlRow
          label="Police Stations"
          checked={controls.civics.policeStations.visible}
          disabled={!controls.civics.visible}
          onCheckedChange={() => toggleControl('civics.policeStations.visible')}
        />
      </ControlGroup>
    </div>
  );
}
