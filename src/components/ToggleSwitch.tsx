import { useState } from 'react';

type ToggleSwitchProps = {
  isOn?: boolean;
  onToggle?: (newState: boolean) => void;
  label: string
  disabled?: boolean
};

const ToggleSwitch = ({ isOn = false, onToggle, label, disabled }: ToggleSwitchProps) => {
  const [toggled, setToggled] = useState(isOn);

  const handleToggle = () => {
    if (!disabled) {
      onToggle?.(!toggled);
      setToggled(prevState => !prevState);
    }
  };

  return (
    <div className={`toggle ${toggled ? 'on' : 'off'} ${disabled && 'disabled'}`} onClick={handleToggle}>
      <div className="switch" />
      <span className="label">{label}</span>
    </div>
  );
};

export default ToggleSwitch;