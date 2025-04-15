interface ToggleSwitchProps {
  isOn?: boolean;
  onToggle?: (newState: boolean) => void;
  label: string
  disabled?: boolean
};

const ToggleSwitch = ({ isOn = false, onToggle, label, disabled }: ToggleSwitchProps) => {

  const handleToggle = () => {
    if (!disabled) {
      onToggle?.(!isOn);
    }
  };

  return (
    <div className={`toggle ${isOn ? 'on' : 'off'} ${disabled && 'disabled'}`} onClick={handleToggle}>
      <div className="switch" />
      <span className="label">{label}</span>
    </div>
  );
};

export default ToggleSwitch;