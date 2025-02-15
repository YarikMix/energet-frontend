import { Stack } from "@mui/material";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import React from "react";

export const ConsumptionSeasons = () => {
    return (
        <Stack p={3} gap={5}>
            <ConsumptionPowerInput label="Зима" />
            <ConsumptionPowerInput label="Весна" />
            <ConsumptionPowerInput label="Лето" />
            <ConsumptionPowerInput label="Осень" />
        </Stack>
    );
};
