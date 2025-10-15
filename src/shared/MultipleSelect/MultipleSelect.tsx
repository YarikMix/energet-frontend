import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { T_ItemOption } from "entities/Item/model/types/Item.ts";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

interface IProps {
    label: string;
    options?: T_ItemOption[];
    value: string[];
    onChange: (value: string[]) => void;
}

export default function MultipleSelect({ label, options, value, onChange }: IProps) {
    const theme = useTheme();

    if (!options) {
        return <div></div>;
    }

    const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value;
    if (Array.isArray(selectedValue)) {
        onChange(selectedValue);
    } else {
        onChange([]);
    }
};

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                MenuProps={MenuProps}
            >
                {options.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.name}
                        style={getStyles(item.name, value, theme)}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

