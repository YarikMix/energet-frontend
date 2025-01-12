import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ItemOption } from "entities/Item/model/types/Item.ts";

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
    options?: ItemOption[];
    onChange: (value: number[]) => void;
}

export default function MultipleSelect({ label, options, onChange }: IProps) {
    const theme = useTheme();
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

    if (!options) {
        return <div>sadfasdf</div>;
    }

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        if (Array.isArray(value)) {
            setSelectedOptions(value);
            onChange(
                value.map((option) => options.find((i) => i.name == option).id)
            );
        } else {
            setSelectedOptions([]);
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
                value={selectedOptions}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                MenuProps={MenuProps}
            >
                {options.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.name}
                        style={getStyles(item.name, selectedOptions, theme)}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
