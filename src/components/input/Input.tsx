interface InputProps {
    placeholder: string;
    type: string;
    value: string;
    mode: string;
    onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChange, type, mode }) => {

    let modeColor = null;
    if (mode === 'primary') modeColor = 'var(--color-primary)'
    if (mode === 'secondary') modeColor = 'var(--color-secondary)'
    if (mode === 'light') modeColor = 'var(--color-light)'
    if (mode === 'disabled') modeColor = 'var(--color-disabled)'
    if (mode === 'enfasis') modeColor = 'var(--color-enfasis)'

    return (
        <div>
            <input
                type={type}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder={placeholder}
                style={{
                    // width: '100%',
                    padding: 10,
                    borderRadius: 5,
                    border: `1px solid ${modeColor}`,
                    margin: 10
                }}
                disabled={mode === 'disabled' ? true : false}
            />
        </div>
    )
}