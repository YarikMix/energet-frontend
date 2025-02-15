import React from "react";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import { Box } from "@mui/material";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { updatePower } from "entities/Configurator/lib/slices/configuratorSlice.ts";

export const ConsumptionConstant = () => {
    const { power } = useAppSelector((state) => state.configuratorReducer);

    const dispatch = useAppDispatch();

    const setPower = (value) => {
        dispatch(updatePower(value));
    };

    return (
        <Box p={3}>
            <ConsumptionPowerInput value={power} setValue={setPower} />
        </Box>
    );
};
