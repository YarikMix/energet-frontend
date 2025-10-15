import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { ChangeEvent } from "react";

interface IProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    onIconClick?: () => void;
}

export const SearchInput = ({
    value,
    placeholder = "Поиск",
    onChange,
    onIconClick,
}: IProps) => {
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleClear = () => {
        onChange("");
    };

    return (
        <TextField
            value={value}
            variant="standard"
            placeholder={placeholder}
            onChange={handleOnChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton onClick={onIconClick}>
                            <Search />
                        </IconButton>
                    </InputAdornment>
                ),
                endAdornment: (
                    value && (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClear}>
                                <Clear />
                            </IconButton>
                        </InputAdornment>
                    )
                ),
            }}
        />
    );
};
