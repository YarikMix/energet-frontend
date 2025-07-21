// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Stack } from "@mui/material";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";

const values = Array.from({ length: 12 }).fill(100);

export const ConsumptionMonth = () => {
    return (
        <Stack gap={3} p={3}>
            {values.map((value, idx) => (
                <ConsumptionPowerInput label={"Месяц №" + (idx + 1)} />
            ))}
        </Stack>
    );
};
