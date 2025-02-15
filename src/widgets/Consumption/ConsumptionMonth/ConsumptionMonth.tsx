import { Stack } from "@mui/material";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import React, { useState } from "react";

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
