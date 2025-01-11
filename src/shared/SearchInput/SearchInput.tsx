import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { ChangeEvent } from "react";

interface IProps {
    placeholder?: string;
    onChange: (value: string) => void;
    onIconClick?: () => void;
}

export const SearchInput = ({
    placeholder = "Поиск",
    onChange,
    onIconClick,
}: IProps) => {
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <TextField
            variant="standard"
            placeholder={placeholder}
            onChange={handleOnChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={onIconClick}>
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};
