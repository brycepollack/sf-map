import { Checkbox } from '@/components/ui/checkbox';

interface ControlRowProps {
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
  disabled?: boolean;
  bold?: boolean;
}

export default function ControlRow({
  label,
  checked,
  onCheckedChange,
  disabled,
  bold,
}: ControlRowProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-2.5 hover:bg-muted transition-colors">
      <Checkbox checked={checked} disabled={disabled} onCheckedChange={onCheckedChange} />
      <span className={`text-sm${bold ? ' font-medium' : ''}`}>{label}</span>
    </label>
  );
}
