import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorInputProps {
  value: string;
  label?: string;
  onChange: (color: string) => void;
}

export const ColorInput = ({ value, onChange, label }: ColorInputProps) => {
  const [isPickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setPickerOpen(false);
    }
  };

  const formatHexColor = (input: string) => {
    const cleaned = input.replace(/[^0-9a-fA-F]/g, "").toLowerCase();
    const hex = cleaned.slice(0, 6);
    return hex ? `#${hex}` : "";
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="color-input-wrapper" ref={pickerRef}>

      <div
        className="color-input-field"
        onClick={() => setPickerOpen((prev) => !prev)}
      >

        <div
          className="color-preview"
          style={{ backgroundColor: value }}
        />

        {label && <span className="color-label">{label}</span>}


      </div>

      {isPickerOpen && (
        <div className="color-picker-popover">
          <HexColorPicker color={value} onChange={onChange} />
          <input value={value ?? "#ffffff"} onChange={(e) => onChange(formatHexColor(e.target.value))} />
        </div>
      )}

    </div>
  );
};