
interface SelectOption {
    value: string;
    label: string;
};

interface SelectInputProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
};

export const SelectInput = ({ label, name, value, onChange, options }: SelectInputProps) => {
    return (
        <div className="select-input">
            {label && <label htmlFor={name}>{label}</label>}
            <select id={name} name={name} value={value} onChange={onChange}>
                <option value="">Selecione...</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};