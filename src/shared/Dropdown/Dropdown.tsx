// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Option {
    id: number;
    name: string;
}

interface Props {
    options: Option[];
    value: number | null;
    onChange: (value: number | null) => void;
    disabled?: boolean;
}

export const Dropdown = ({
    label,
    options,
    value,
    onChange,
    disabled = false,
}: Props) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(parseInt(event.target.value));
    };

    return (
        <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
                disabled={disabled}
            >
                {options.map((order) => (
                    <MenuItem value={order.id}>{order.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
