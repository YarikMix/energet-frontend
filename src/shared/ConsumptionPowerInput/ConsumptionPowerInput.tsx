import { Stack, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

const COEFFICIENT = 0.024;

export const ConsumptionPowerInput = ({ value, setPower, label }) => {
    const { control, setValue } = useForm({
        defaultValues: {
            watts: value,
            kwh: Number((value * COEFFICIENT).toFixed(2)),
        },
    });

    const wattsValue = useWatch({ control, name: "watts" });
    const kwhValue = useWatch({ control, name: "kwh" });

    const onWattsChange = (e) => {
        const watts = parseFloat(e.target.value) || 0;
        setValue("watts", Math.round(watts));
        setValue("kwh", Number((watts * COEFFICIENT).toFixed(2)));
    };

    const onKwhChange = (e) => {
        const kwh = parseFloat(e.target.value) || 0;
        setValue("kwh", kwh);
        setValue("watts", Math.round(kwh / COEFFICIENT));
    };

    const updateStoreValue = (value: number) => {
        if (wattsValue !== value) {
            setPower(wattsValue);
        }
    };

    const throttled = useRef(debounce(updateStoreValue, 250));
    useEffect(() => throttled.current(wattsValue), [wattsValue]);

    return (
        <Stack gap={3}>
            {label && <span>{label}</span>}
            <Stack direction="row" gap={3} alignItems="center">
                <TextField
                    label="Значение (Вт)"
                    variant="outlined"
                    sx={{ width: 375 }}
                    type="number"
                    value={wattsValue}
                    onChange={onWattsChange}
                />
                <Typography variant="subtitle1">ИЛИ</Typography>
                <TextField
                    label="Значение (кВт*ч/сутки)"
                    variant="outlined"
                    sx={{ width: 375 }}
                    type="number"
                    value={kwhValue}
                    onChange={onKwhChange}
                />
            </Stack>
        </Stack>
    );
};
