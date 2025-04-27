import React from "react";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import { Box } from "@mui/material";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { useSelector } from "react-redux";
import { getConsumptionConst } from "entities/Configurator/model/selectors/getConsumption.ts";
import { updateConsumptionConst } from "entities/Configurator/lib/slices/configuratorSlice.ts";

export const ConsumptionConstant = () => {
    const consumption = useSelector(getConsumptionConst);

    const dispatch = useAppDispatch();

    const setPower = (value: number) => {
        dispatch(updateConsumptionConst(value));
    };

    return (
        <Box p={3}>
            <ConsumptionPowerInput value={consumption} setValue={setPower} />
        </Box>
    );
};
