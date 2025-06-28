// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Stack, TextField, Typography } from "@mui/material";

const COEFFICIENT = 0.024;

export const ConsumptionPowerInput = ({ value, setValue, label }) => {
    const onFirstInputChange = (e) => {
        setValue(Math.round(parseFloat(e.target.value)));
    };

    const onSecondInputChange = (e) => {
        setValue(Math.round(parseFloat(e.target.value) / COEFFICIENT));
    };

    return (
        <Stack gap={3}>
            {label && <span>{label}</span>}
            <Stack direction="row" gap={3} alignItems="center">
                <TextField
                    label="Значение (Вт)"
                    variant="outlined"
                    sx={{ width: 375 }}
                    type="number"
                    value={value}
                    onChange={onFirstInputChange}
                />
                <Typography variant="span">ИЛИ</Typography>
                <TextField
                    label="Значение (кВт*ч/с)"
                    variant="outlined"
                    sx={{ width: 375 }}
                    type="number"
                    value={Math.round(value * COEFFICIENT)}
                    onChange={onSecondInputChange}
                />
            </Stack>
        </Stack>
    );
};
