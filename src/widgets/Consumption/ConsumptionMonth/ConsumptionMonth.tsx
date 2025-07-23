// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Stack } from "@mui/material";
import { useState } from "react";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";

export const ConsumptionMonth = () => {
    const [values, setValues] = useState(Array.from({ length: 12 }).fill(100));

    return (
        <Stack gap={3} p={3}>
            {values.map((value, idx) => (
                <ConsumptionPowerInput label={"Месяц №" + (idx + 1)} />
            ))}
        </Stack>
    );
};
