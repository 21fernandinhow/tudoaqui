import { Tooltip } from "./Tooltip";

interface ToggleSwitchProps {
  isOn?: boolean;
  onToggle?: (newState: boolean) => void;
  label: string
  disabled?: boolean
  disabledMessage?: string
  disabledMessagePosition?: 'top' | 'bottom' | 'left' | 'right'
};

const ToggleSwitch = ({ isOn = false, onToggle, label, disabled, disabledMessage, disabledMessagePosition = 'top' }: ToggleSwitchProps) => {

  const handleToggle = () => {
    if (!disabled) {
      onToggle?.(!isOn);
    }
  };

  return (
    <div className={`toggle ${isOn ? 'on' : 'off'} ${disabled && 'disabled'}`} onClick={handleToggle}>
      <span className="label">{label}</span>
      {disabled && disabledMessage ?
        <Tooltip text={disabledMessage} position={disabledMessagePosition}><div className="switch" /></Tooltip>
        : <div className="switch" />
      }
    </div>
  );
};

export default ToggleSwitch;