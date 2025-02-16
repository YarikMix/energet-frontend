import { Stack } from "@mui/material";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import React from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import {
    updatePower1,
    updatePower2,
} from "entities/Configurator/lib/slices/configuratorSlice.ts";

export const ConsumptionSeasons = () => {
    const { power1, power2 } = useAppSelector(
        (state) => state.configuratorReducer
    );

    const dispatch = useAppDispatch();

    return (
        <Stack p={3} gap={5}>
            <ConsumptionPowerInput
                label="Зима"
                value={power1}
                setValue={(value) => dispatch(updatePower1(value))}
            />
            <ConsumptionPowerInput
                label="Лето"
                value={power2}
                setValue={(value) => dispatch(updatePower2(value))}
            />
            {/*<ConsumptionPowerInput label="Весна" />*/}
            {/*<ConsumptionPowerInput label="Осень" />*/}
        </Stack>
    );
};
