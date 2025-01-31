import { Box, IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";

type Props = {
    value: number;
    setValue: (value: number) => void;
    min: number;
    max: number;
    error: boolean;
    setError: (value: boolean) => void;
};

export const InputCounter = ({
    value,
    setValue,
    min,
    max,
    error,
    setError,
}: Props) => {
    const variantBackgroundColor = {
        filled: "primary.main",
    };

    const variantColor = {
        filled: "white",
    };

    const MyIconButton = ({ variant, ...other }) => {
        return (
            <IconButton
                sx={{
                    backgroundColor: variantBackgroundColor[variant],
                    color: variantColor[variant],
                    "&:hover": {
                        backgroundColor: variantBackgroundColor[variant],
                    },
                }}
                {...other}
            />
        );
    };

    const handleInput = (e) => {
        const { value } = e.target;

        if (!value || value < min || value > max) {
            setError(true);
        } else {
            setError(false);
        }

        setValue(parseInt(value));
    };

    const handleIncrease = () => {
        if (value < max) {
            setError(false);
            setValue(value + 1);
        }
    };

    const handleDecrease = () => {
        if (value > min) {
            setError(false);
            setValue(value - 1);
        }
    };

    return (
        <Box display="flex" alignItems="center" gap="10px">
            <MyIconButton variant="filled" onClick={handleDecrease}>
                <RemoveIcon />
            </MyIconButton>
            <TextField
                label="Количество"
                variant="outlined"
                sx={{ width: "125px" }}
                value={value}
                onChange={handleInput}
                type="number"
                error={error}
            />
            <MyIconButton variant="filled" onClick={handleIncrease}>
                <AddIcon />
            </MyIconButton>
        </Box>
    );
};
